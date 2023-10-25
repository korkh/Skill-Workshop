import { makeAutoObservable, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../../api/agent";
import { router } from "../layout/router/Routes";
import { store } from "./store";
import { AxiosError } from "axios";

export default class UserStore {
  user: IUser | null = null;
  //fbAccessToken: string | null = null;
  fbLoading = false;
  refreshTokenTimeout: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user; //It converts the following value into a boolean by negating it twice. It effectively coerces any truthy value to true and any falsy value to false.
  }

  login = async (credentials: IUserFormValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
      router.navigate("/trainings");
      store.modalStore.closeModal();
    } catch (error) {
      console.log("Login Error:", error);
      throw error;
    }
  };

  register = async (credentials: IUserFormValues) => {
    try {
      await agent.Account.register(credentials);
      router.navigate(
        `/account/registrationSuccess?email=${credentials.email}`
      );
      store.modalStore.closeModal();
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion

      if (axiosError.response && axiosError.response.status === 400) {
        throw error;
      }
      store.modalStore.closeModal();
      console.log(500);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => (this.user = user));
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setDisplayName = async (name: string) => {
    if (this.user) this.user.displayName = name;
  };

  // getFacebookLoginStatus = async () => {
  //   window.FB.getLoginStatus((response: any) => {
  //     if (response.status === "connected") {
  //       this.fbAccessToken = response.authResponse.accessToken;
  //     }
  //   });
  // };

  facebookLogin = async (accessToken: string) => {
    try {
      this.fbLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
        this.fbLoading = false;
      });
      router.navigate("/trainings");
    } catch (error) {
      console.log(error);
      runInAction(() => (this.fbLoading = false));
    }
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimeout();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => (this.user = user));
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error);
    }
  };

  private startRefreshTokenTimer(user: IUser) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private stopRefreshTokenTimeout() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
      this.refreshTokenTimeout = null;
    }
  }
}
