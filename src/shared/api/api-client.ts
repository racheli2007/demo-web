import axios, { AxiosInstance } from "axios";
import { isTokenExpired } from "./jwt";
import { Extension } from "../../shared/model/user-onboarding";
import {  RecordFile, RecordingForm } from "../../shared/model/Record";
import { HistoryForm } from "../../components/history/store/history-store";
import { Call } from "../model/call";


export class ApiClient {
  USER_TOKEN_KEY = "user_token";
  constructor( private _client: AxiosInstance = axios,) {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        let status;
        try {
          status = error.response.status;
        }
        catch {
          return Promise.reject(error);

        }
        if (status === 500) {

        }
        if (status === 422) {
        }
        if (
          status === 401
        ) {
          console.log("error", error);
          // return "hello"

          return Promise.reject({ err: error.response.data, response: null })
        }
        return Promise.reject(error);
      }
    );
    this._client.defaults.baseURL = "https://webrtc.phone.do/" || "";
  }

  private get client() {
    const token =localStorage.getItem(this.USER_TOKEN_KEY);
    this._client.defaults.headers["Content-Type"] = "application/ld+json";
    this._client.defaults.headers.Accept = "application/ld+json";
    this._client.defaults.headers.Authorization =
      token && !isTokenExpired(token) ? `Bearer ${token}` : undefined;

    return this._client;
  }

  login(username: string, password: string) {
    return this._client
      .post(
        "user/login",
        {
          username: username,
          password: password,
        },
        { headers: { "Content-type": "application/json" } }
      )
      .then((response) => response.data);
  }

  searchRecording(params: RecordingForm) {
    return this.client
      .get("recording/recordings/list", { params })
      .then((response) => response.data);
  }

  searchHistory(params: HistoryForm) {
    return this.client
      .get("cdrs/list", { params })
      .then((response) => response.data);
  }
  getRecordFile(params: RecordFile) {
    return this.client
      .get("recording/recordings/get", { params })
      .then((response) => response.data);
  }
  getRecordGroupsList() {
    return this.client.get("recording/groups/list").then((response) => {
      return response.data;
    });
  }

  getActiveCalls() {
    return this.client.get<Call[]>("calls/active/list").then((response) => {
      return response.data;
    });
  }

  userOnboardingFetch() {
    return this.client
      .post<Extension[]>(`phones/list`, {
        headers: { "Content-type": "application/json" },
      })
      .then((response) => response.data);
  }

  getHotlineDetails(id:string) {
    return this.client
      .get(`qr-code/getIdByUuid/${id}`)
      .then((response) => response.data);
  }
}
export default new ApiClient();
