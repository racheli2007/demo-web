import { observer } from "mobx-react";
import { History } from "history";
import homeIcon from "../../assets/icons/home_icon.png";
import contactIcon from "../../assets/icons/contact_icon.png";
import dialerIcon from "../../assets/icons/dialer_icon.png";
import historyIcon from "../../assets/icons/history_icon.png";
import recordingIcon from "../../assets/icons/recording_icon.png";
import transcriptsIcon from "../../assets/icons/transcript_icon.png";
import settingsIcon from "../../assets/icons/settings_icon.png";
import messagesIcon from "../../assets/icons/messages_icon.png";
import logoutIcon from "../../assets/icons/logout.png";
import "./sidebar.css"

type Props = {
    history: History;
    selected: string;
};

export const Sidebar = observer((props: Props) => {
    const { history, selected } = props;

    return (
        <div>
            <div className="sidenav">
                <div className={selected === "home" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt"} onClick={() => history.push("/")}><img alt="home" src={homeIcon} className="icon" />Home</div>
                <div className={selected === "contact" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt"} onClick={() => history.push("/contact")}><img alt="home" src={contactIcon} className="icon" />Contact</div>
                <div className={ selected === "dialer" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt" } onClick={() => history.push("/dialer")} > <img alt="logout" src={dialerIcon} className="icon" />Dialer </div>
                <div className={selected === "history" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt"} onClick={() => history.push("/history")}><img alt="home" src={historyIcon} className="icon" />History</div>
                <div className={selected === "recording" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt"} onClick={() => history.push("/recording")}><img alt="home" src={recordingIcon} className="icon" />Recording</div>
                <div className={ selected === "transcripts" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt" } onClick={() => history.push("/transcripts")} > <img alt="logout" src={transcriptsIcon} className="icon" />Transcripts </div>
                <div className={selected === "messages" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt"} onClick={() => history.push("/messages")}><img alt="home" src={messagesIcon} className="icon" />Messages</div>
                <div className={ selected === "settings" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt" } onClick={() => history.push("/settings")} > <img alt="logout" src={settingsIcon} className="icon" />Settings </div>
                <div className="margin"><div className="separator-line"></div></div>
                <div className={ selected === "login" ? "sidebarTxt sidebarTxtSelect" : "sidebarTxt" } onClick={() => history.push("/login")} > <img alt="logout" src={logoutIcon} className="icon" />Logout </div>
            </div>
        </div>
    );
});
