import { Extension } from "./user-onboarding";

export type SignupTokenCode = {
    id: string,
    verified: boolean   
}

export type UserSignUp = {
  username:string,
  password:string,
  extensions:Extension
}