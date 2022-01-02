import { useState } from "react";
import { observer } from "mobx-react";
import { Field, Form } from "react-final-form";
import { InputField } from "../lib/final-form/input-field";
import  { LoginForm } from "./login/store/login-store";
import { History } from "history";
import { useWebRtcStore } from "../stores/use-webrtc-store";
type Location = {
  hash?: string;
  key?: string;
  pathname?: string;
  search?: string;
  state: { to: string };
};
type Props = {
  history: History;
  location: Location;
};

export const Login = observer((props: Props) => {
  const { loginStore } = useWebRtcStore()
  const { history ,location} = props;
  const [errorMessageflag, setErrorMessageflag] = useState(false);
  const [errorPasswordflag, setErrorPasswordflag] = useState(false);
  const [errorUsernameflag, setErrorUsernameflag] = useState(false);
console.log(location,"location");
  return (
    <div className="">
      <Form<LoginForm>
        initialValues={loginStore.loginForm}
        onSubmit={async (form) => {
          setErrorPasswordflag(false);
          setErrorUsernameflag(false);
          if (form.username && form.password) {
            if (form.formScenario === "sign_in") {
              let submitLoginRes = await loginStore.submitLoginForm({
                username: form.username,
                password: form.password,
              });
              if (submitLoginRes) return submitLoginRes;
              return history.push(location.state?location.state.to:"/dialer");
            } else
              throw new Error("Invalid form scenario: " + form.formScenario);
          } else if (!form.username) {
            setErrorUsernameflag(true);
          } else if (!form.password) {
            setErrorPasswordflag(true);
          } else {
            setErrorMessageflag(true);
          }
        }}
      >
        {({submitErrors, handleSubmit, submitting, form }) => (
          <form onSubmit={handleSubmit}>
            {console.log("submitErrors",submitErrors)}
            <div className="">
              <span className="TitleText">Username:</span>
              <div className="">
                <Field
                  name={"username"}
                  inputType={"text"}
                  placeholder={"example@gmail.com"}
                  component={InputField}
                ></Field>
              </div>
              {errorUsernameflag === true ? (
                <div className="">The username field cannot be left blank</div>
              ) : null}

              <span className="TitleText">
                Password<span className="star"></span>
              </span>
              <Field
                name={"password"}
                inputType={"password"}
                component={InputField}
              ></Field>
             
              {errorPasswordflag === true ? (
                <div className="">The password field cannot be left blank</div>
              ) : null}
              {errorMessageflag === true ? (
                <div className="">
                  The password field or username field cannot be left blank
                </div>
              ) : null}
               <div id="err">{
                submitErrors
              }</div>
            </div>
            <button
              className=""
              onClick={() => {
                form.change("formScenario", "sign_in");
              }}
              disabled={submitting}
            >
              <div className="">Log in</div>
            </button>
          </form>
        )}
      </Form>
    </div>
  );
});
