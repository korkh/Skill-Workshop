import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResult } from "../app/models/pagination";
import { router } from "../app/layout/router/Routes";
import { Training, TrainingFormValues } from "../app/models/training";
import { IUser, IUserFormValues } from "../app/models/user";
import { IUserTraining, Profile } from "../app/models/profile";
import { IPhoto } from "../app/models/photo";
import { store } from "../app/stores/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  //Every request if we do have a token we are going to add this token to headers
  //as Authorization header
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<unknown>>;
    }
    //if no pagination usual response returning
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (
          config.method === "get" &&
          Object.prototype.hasOwnProperty.call(data.errors, "id")
        ) {
          //we need that to separate jsut bad request from bad GUID
          //First we are checking that it is a GET request and if it is checking if there is property 'id' in errors.
          router.navigate("/not-found"); //we dont have an training that matches to something like a valid GUID and it ease to send to not-found page that explain that it was used not valid GUID..
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers["www-authenticate"]?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          store.userStore.logout();
          toast.error("Session expired - please login again");
        }
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        toast.error("not found");
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Trainings = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Training[]>>("/trainings", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Training>(`/trainings/${id}`),
  create: (training: TrainingFormValues) =>
    requests.post<void>("/trainings", training),
  update: (training: TrainingFormValues) =>
    requests.put<void>(`/trainings/${training.id}`, training),
  delete: (id: string) => requests.del<void>(`/trainings/${id}`),
  attend: (id: string) => requests.post<void>(`/trainings/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<IUser>("/account"),
  login: (user: IUserFormValues) =>
    requests.post<IUser>("/account/login", user),
  register: (user: IUserFormValues) =>
    requests.post<IUser>("/account/register", user),
  fbLogin: (accessToken: string) =>
    requests.post<IUser>(`/account/fbLogin?accessToken=${accessToken}`, {}),
  refreshToken: () => requests.post<IUser>("/account/refreshToken", {}),
  verifyEmail: (token: string, email: string) =>
    requests.post<void>(
      `/account/verifyEmail?token=${token}&email=${email}`,
      {}
    ),
  resendEmailConfirm: (email: string) =>
    requests.get(`/account/resendEmailConfirmationLink?email=${email}`),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post<IPhoto>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`/photos/${id}`),
  //Partial<Profile> as we are only allowing the user to update 2 of the properties contained in the Profile type.
  updateProfile: (profile: Partial<Profile>) =>
    requests.put(`/profiles`, profile),
  updateFollowing: (userName: string) =>
    requests.post(`/follow/${userName}`, {}),
  listFollowings: (userName: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${userName}?predicate=${predicate}`),
  listTrainings: (userName: string, predicate: string) =>
    requests.get<IUserTraining[]>(
      `/profiles/${userName}/trainings?predicate=${predicate}`
    ),
};

const agent = {
  Trainings,
  Account,
  Profiles,
};

export default agent;
