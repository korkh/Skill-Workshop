import { makeAutoObservable, reaction, runInAction } from "mobx";
import { IProfile, IUserTraining, Profile } from "../models/profile";
import { IPhoto } from "../models/photo";
import agent from "../../api/agent";
import { store } from "./store";
export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings: IProfile[] = [];
  loadingFollowings: boolean = false;
  activeTab: number = 0;
  userTrainings: IUserTraining[] = [];
  loadingTrainings = false;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
  }

  setActiveTab = (activeTab: number) => {
    this.activeTab = activeTab;
  };

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.userName;
    }
    return false;
  }

  loadProfile = async (userName: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profiles.get(userName);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          //checking if photo we getting back is a main Photo
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
          }
        }

        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((p) => p.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  updateProfile = async (profile: Partial<IProfile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName &&
          profile.displayName !== store.userStore.user?.displayName
        ) {
          store.userStore.setDisplayName(profile.displayName);
        }
        if (profile.bio && this.profile) {
          this.profile.bio = profile.bio;
        }
        this.profile = { ...this.profile, ...(profile as IProfile) };

        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };
  // we are setting the Profile with the existing profile and overwriting any changes to the profile from
  // the partial profile we are passing in as a parameter so we need to make use of the ‘as Profile’ to
  // make TypeScript happy

  updateFollowing = async (userName: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(userName);
      store.trainingStore.updateAttendeeFollowing(userName);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.userName !== store.userStore.user?.userName &&
          this.profile.userName === userName
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (
          this.profile &&
          this.profile.userName === store.userStore.user?.userName
        ) {
          following
            ? this.profile.followingCount++
            : this.profile.followingCount--;
        }

        this.followings.forEach((profile) => {
          if (profile.userName === userName) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };

  loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;
    try {
      const followings = await agent.Profiles.listFollowings(
        this.profile!.userName,
        predicate
      );
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollowings = false));
    }
  };

  loadUserTrainings = async (userName: string, predicate?: string) => {
    this.loadingTrainings = true;
    try {
      const trainings = await agent.Profiles.listTrainings(
        userName,
        predicate!
      );
      runInAction(() => {
        this.userTrainings = trainings;
        this.loadingTrainings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingTrainings = false));
    }
  };
}
