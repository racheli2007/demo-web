import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Field, Form } from "react-final-form";
import { History } from "history";
import loadingGif from "../../assets/icons/loading.gif";
import { LoginForm } from "./store/login-store";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import loginGif from "../../assets/images/login.gif";
import logo from "../../assets/icons/login_logo.png";
import "./login.css";
import { useWebRtcStore } from "../../stores/use-webrtc-store";
import eyeIcon from "../../assets/icons/eye.png";
import hiddenIcon from "../../assets/icons/hidden.png";

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

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)};

  const { loginStore } = useWebRtcStore()

  const { history, location } = props;
  const [errorMessageflag, setErrorMessageflag] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    myHeaders.append("Authorization", "Basic QVBJXzE2Mjk5Nzg2MTIyMDExODY0MTgwMjgwOkZIUyEjTjJ4aWFTcHAkZA==");
    myHeaders.append("Cookie", "JSESSIONID=8E89FE457723978CECAF98201E8E596F; TS0157275e=018b1f380b546ca467168e1f4aefc0c6b1b268d774109e913cad698b27a8084aee1f24e2c2bf9261c281f7f00fc52d025723af10a3d6d34a955824e5098fb24c93ecff9613; TS01dbdafe=018b1f380b035623529fcdd2a1a123593e4dc2db8d767f61bb4cf4b002c2a5295eaaee9985c1676c19dc62ee3af60c414256cd8ccd");

    var raw = "\r\n\r\n<param-encryption xmlns=\"http://ws.plimus.com\">\r\n    <parameters>\r\n        <parameter>\r\n            <param-key>amount</param-key>\r\n            <param-value>200</param-value>\r\n        </parameter>\r\n        <parameter>\r\n            <param-key>thankyou.backtosellerurl</param-key>\r\n            <param-value>https%3A%2F%2Flocalhost:3000%2Fphone-number</param-value>\r\n        </parameter>\r\n                <parameter>\r\n            <param-key>recurringamount</param-key>\r\n            <param-value>200</param-value>\r\n        </parameter>\r\n        \r\n    </parameters>\r\n</param-encryption>";

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    fetch("https://sandbox.bluesnap.com/services/2/tools/param-encryption", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, [])
  console.log(location, "location");
  return (
    <div className="">
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      />
      <Form<LoginForm>
        initialValues={loginStore.loginForm}
        onSubmit={async (form) => {
          setLoading(true);
          if (username && password) {
            if (form.formScenario === "sign_in") {
              let submitLoginRes = await loginStore.submitLoginForm({
                username: username,
                password: password,
              });
              if (submitLoginRes) {
                setLoading(false);
                setErrorMessageflag(submitLoginRes);
                return submitLoginRes;
              }
              return history.push(
                location.state ? location.state.to : "/dialer"
              );
            } else
              throw new Error("Invalid form scenario: " + form.formScenario);
          }
        }}
      >
        {({ submitError, handleSubmit, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="right-side">
            <img src={loginGif} alt="login gif" className="right-side-img" />
            <div className="login-form">
              <img src={logo} alt="phondo" className="logo"></img>
              <div>
                <h1>{('Welcome to Phone.do')}</h1>
                <h1>{('Login to getting started')}</h1>
                <h3>enter your details to proceed further</h3>
              </div>
              <div className="field">
                <label>Username:</label>
                <div>
                  <TextField
                    error={errorMessageflag}
                    helperText={errorMessageflag}
                    name="username"
                    autoFocus
                    placeholder="Username"
                    type=""
                    fullWidth
                    required
                    variant="outlined"
                    onChange={(e) => {
                      pristine = false;
                      setUsername(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonOutlineOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <label>Password:</label>
                <div>
                  <TextField
                    error={errorMessageflag}
                    helperText={errorMessageflag}
                    variant="outlined"
                    required
                    fullWidth
                    placeholder={"Password"}
                    name="password"
                    type={passwordShown ? "text" : "password"}

                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                        <img className="eyeIcon" onClick={togglePasswordVisiblity} src={passwordShown ?hiddenIcon :eyeIcon} alt="">
                        </img>
                    </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <Field
                  name="rememberme"
                  component="input"
                  type="checkbox"
                ></Field>
                <div></div>
                <label>Remember me</label>
              </div>
              {loading ? (
                <img src={loadingGif} alt="wait gif"></img>
              ) : (
                <button
                  onClick={() => {
                    form.change("formScenario", "sign_in");
                  }}
                  disabled={username === "" || password === ""}
                  className="field"
                >
                  Login
                </button>
              )}
            </div>
          </form>
        )}
      </Form>
    </div>
  );
});
