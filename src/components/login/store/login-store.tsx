import {handleFormSubmit} from "../../../lib/final-form/final-form";
import { ApiClient } from "../../../shared/api/api-client";
import { AuthStore } from "../../../stores/auth-store";
import { LocaleLoader } from '../../../shared/lib/lingui/locale-loader';


export type LoginForm = {
    username: string;
    password: string;
    formScenario?: 'sign_in' | 'reset_password';
}

export class LoginStore {
    constructor(
        public apiClient:  ApiClient,
        public authStore:AuthStore,
    public localeLoader: LocaleLoader
      ){
          var l=window.navigator.language;
        this.localeLoader.setLocale(l);
      }
    loginForm?: LoginForm;
  
    submitLoginForm = async (form: LoginForm) => {
        const response = await handleFormSubmit((this.apiClient.login(form.username, form.password)));
        if (response.err) {
            return response.err["FINAL_FORM/form-error"]
        }
        const token  = response.response;
        await this.authStore.fetchAuthUser(token).then();
    }

}
