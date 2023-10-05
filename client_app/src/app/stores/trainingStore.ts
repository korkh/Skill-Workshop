import { makeAutoObservable, reaction, runInAction } from "mobx";
import { format } from "date-fns";
import { Profile } from "../models/profile";
import { IPagination, PagingParams } from "../models/pagination";
import { ITraining, Training, TrainingFormValues } from "../models/training";
import agent from "../../api/agent";

export default class TrainingStore {
  trainingRegistry = new Map<string, ITraining>();
  selectedTraining: ITraining | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: IPagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    //React to any predicate change
    reaction(
      () => this.predicate.keys(), //observing are the keys is going to change
      () => {
        //because of usage of switch cases we can observe the key changes and do something if any of the key inside there are changed.
        this.pagingParams = new PagingParams(); //reseting due to usage of filtering and no way to know
        this.trainingRegistry.clear();
        this.loadTrainings(); //loadTrainings has params and we are loading next batch of trainings
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((_, key) => {
        if (key !== "startDate") {
          this.predicate.delete(key);
        }
      });
    };

    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        resetPredicate();
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
        break;
    }
  };
  //this code is preparing query parameters for an Axios HTTP request, to be sent as part of a URL when making an API call.
  //The pageNumber and pageSize are part of the pagination mechanism to fetch data in specific chunks or pages from the server.
  get axiosParams() {
    const params = new URLSearchParams(); //not imported from url !!!
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    //loop over all keys inside predicate
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        //checks predicate if exist startDate
        params.append(key, (value as Date).toISOString()); //appending to query
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  //we need computed properties return training by date
  get trainingsByDates() {
    return Array.from(this.trainingRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedActivities() {
    //Get array of objects {[key: string] : Training[]}
    //and each object will have a key (training.date) [key: string]
    //and each date will have an array of trainings inside IActivities[]
    return Object.entries(
      this.trainingsByDates.reduce((trainings, training) => {
        const date = format(training.date!, "dd MMMM yyyy");
        //returning group set of trainings
        trainings[date] = trainings[date]
          ? [...trainings[date], training]
          : [training];
        return trainings;
      }, {} as { [key: string]: ITraining[] })
    );
  }

  //Using arrow function we no worried about binding actions inside the class (action.bound)
  //async is used if we want to manipulate promisies inside
  //async code we will hold inside try-catch but sync outside try-catch
  loadTrainings = async () => {
    this.setLoadingInitial(true);
    try {
      const result = await agent.Trainings.list(this.axiosParams);
      //To remove any wornings when working with async code
      // https://mobx.js.org/actions.html
      //or we can make an action setLoadingInitial
      result.data.forEach((training) => {
        this.setTraining(training);
        // this.trainings.push(training); //comes from trainings: Training[] = [] and by that we mutating our state in MobX
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setPagination = (pagination: IPagination) => {
    this.pagination = pagination;
  };

  //Loading single training by id
  loadTraining = async (id: string) => {
    let training = this.getTraining(id);
    if (training) {
      this.selectedTraining = training;
      return training;
    } else {
      this.setLoadingInitial(true);
      try {
        training = await agent.Trainings.details(id);
        this.setTraining(training);
        runInAction(() => {
          this.selectedTraining = training;
        });

        this.setLoadingInitial(false);
        return training;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setTraining = (training: ITraining) => {
    const user = store.userStore.user;

    if (user) {
      training.isGoing = training.attendees!.some(
        (a) => a.userName === user.userName
      );

      training.isHost = training.hostUsername === user.userName;
      training.host = training.attendees?.find(
        (u) => u.userName === training.hostUsername
      );
    }
    training.date = new Date(training.date!); //separate date from time "T"
    this.trainingRegistry.set(training.id, training);
  };

  private getTraining = (id: string) => {
    return this.trainingRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createTraining = async (training: TrainingFormValues) => {
    training.id = crypto.randomUUID();
    const user = store.userStore.user;
    const attendee = new Profile(user!);

    try {
      await agent.Trainings.create(training);
      //To remove any wornings when working with async code
      // https://mobx.js.org/actions.html
      const newTraining = new Training(training);
      newTraining.hostUsername = user!.userName;
      newTraining.attendees = [attendee]; //array of const attendee = new Profile(user!);
      this.setTraining(newTraining);
      runInAction(() => {
        this.selectedTraining = newTraining;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateTraining = async (training: TrainingFormValues) => {
    try {
      await agent.Trainings.update(training);
      runInAction(() => {
        if (training.id) {
          const updatedTraining = {
            ...this.getTraining(training.id),
            ...training,
          };
          this.trainingRegistry.set(training.id, updatedTraining as Training);
          this.selectedTraining = updatedTraining as Training;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteTraining = async (id: string) => {
    this.loading = true;
    try {
      await agent.Trainings.delete(id);
      runInAction(() => {
        this.trainingRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true; //set loading flag
    try {
      await agent.Trainings.attend(this.selectedTraining!.id);
      runInAction(() => {
        if (this.selectedTraining?.isGoing) {
          //removing attendee object if we cancelling training
          this.selectedTraining.attendees =
            this.selectedTraining.attendees?.filter(
              (a) => a.userName !== user?.userName
            ); //by filter we are removing currently logged in user from attendees array
          this.selectedTraining.isGoing = false;
        } else {
          //add attendee object if we joining an training
          const attendee = new Profile(user!);
          this.selectedTraining?.attendees?.push(attendee);
          this.selectedTraining!.isGoing = true;
        }
        //we take an oppotunitiy to set an training registry in the same time
        this.trainingRegistry.set(
          this.selectedTraining!.id,
          this.selectedTraining!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false)); //switching off loading flag
    }
  };

  cancelTrainingToggle = async () => {
    this.loading = true;
    try {
      await agent.Trainings.attend(this.selectedTraining!.id);
      runInAction(() => {
        this.selectedTraining!.isCancelled =
          !this.selectedTraining?.isCancelled; //used ! to indicate that we sure that it will be not undefined training
        this.trainingRegistry.set(
          this.selectedTraining!.id,
          this.selectedTraining!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  }; //cancelTrainingToggle

  clearSelectedTraining = () => {
    this.selectedTraining = undefined;
  }; //clearSelectedTraining

  updateAttendeeFollowing = (userName: string) => {
    this.trainingRegistry.forEach((training) => {
      training.attendees.forEach((attendee) => {
        if (attendee.userName === userName) {
          attendee.following
            ? attendee.followersCount--
            : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      });
    });
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
