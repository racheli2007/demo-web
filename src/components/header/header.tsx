import { MyDate } from "../../components/dialer/date";
import "./header.css";
import logo from "../../assets/icons/login_logo.png";

export const Header = () => {
  return (
    <header>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      />
      <img className="logo" src={logo} alt="logo" />
      <h2>phone.do office</h2>
      <div className="date">
        <MyDate></MyDate>
      </div>
    </header>
  );
};