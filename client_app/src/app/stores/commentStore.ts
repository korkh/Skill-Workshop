import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { IChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
  comments: IChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  //Creating connection
  createHubConnection = (trainingId: string) => {
    if (store.trainingStore.selectedTraining) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_CHAT_URL + "?trainingId=" + trainingId, {
          accessTokenFactory: () => store.userStore.user?.token as string,
        })
        .withAutomaticReconnect() //helps to recoonect if loosing connection
        .configureLogging(LogLevel.Information) //logging
        .build();

      //start connection
      this.hubConnection
        .start()
        .catch((error) =>
          console.log("Error to establish the collection: ", error)
        );

      //Load comments after connection was established
      this.hubConnection.on("LoadComments", (comments: IChatComment[]) => {
        //update observable inside store, so using runInactoion
        runInAction(() => {
          comments.forEach((comment) => {
            comment.createdAt = new Date(comment.createdAt); //to make date in UTC comming from database
          });
          this.comments = comments;
        });
      });

      //Recieving connection
      this.hubConnection.on("ReceiveComment", (comment: IChatComment) => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt); //here no need "Z" it comes already in UTC format
          this.comments.unshift(comment); //unshift will place a comment in the start of the array
        });
      });
    }
  }; //creating connection

  //Stop connection
  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection ", error));
  };

  //Clear all comments
  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: { body: string; trainingId?: string }) => {
    values.trainingId = store.trainingStore.selectedTraining?.id;
    try {
      await this.hubConnection?.invoke("SendComment", values); //matches the Task name in ChatHub. Sending values in the body as part of POST request
    } catch (error) {
      console.log(error);
    }
  };
}
