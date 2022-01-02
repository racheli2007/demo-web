import { parseJwt } from "../shared/api/jwt";
import { UserOnboarding, Extension } from "../shared/model/user-onboarding";
import { UserSignUp } from "../shared/model/authentication";
import { handleFormSubmit } from "../lib/final-form/final-form";
import { ApiClient } from "../shared/api/api-client";



export type JwtUser = {
  userId: string;
};

export class AuthStore {

  constructor(public apiClient: ApiClient){

  }
  userSignUp?: UserSignUp;
  userOnboarding?: UserOnboarding;
  extensions?: Extension[]|null;
  extension?: Extension;
  isAppLoaded = false;

  async fetchAuthUser(token?: string) {
    const jwt = token || localStorage.getItem(this.apiClient.USER_TOKEN_KEY);
    if (!jwt) {
      this.isAppLoaded = true;
      return;
    }

    let jwtUser: JwtUser | undefined;
    try {
      jwtUser = parseJwt<JwtUser>(jwt);
      localStorage.setItem(this.apiClient.USER_TOKEN_KEY, jwt);
      sessionStorage.setItem("login_time", "" + new Date().getTime());
    } catch (e) {
      console.error(e);
      this.isAppLoaded = true;
      return;
    }
    const user: UserOnboarding = {
      userid: jwtUser.userId,
    };
    this.userOnboarding = user;
    this.extensions=await this.apiClient.userOnboardingFetch();
    
    this.extensions?.forEach((ex) => {
      if (ex.owner === this.userOnboarding?.userid) {
        localStorage.setItem("extension",ex.dnumber);
        this.extension = ex;
      }
    });
    this.isAppLoaded = true;
  }
  async  userOnboardingFetch(){

   const response=await handleFormSubmit(this.apiClient.userOnboardingFetch());
    return response;

  }

}