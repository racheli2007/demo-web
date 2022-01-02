import { ApiClient } from "../shared/api/api-client";
import { DialerStore } from "../components/dialer/store/dialer-store";
import { AuthStore } from "./auth-store";
import { MakeACallStore } from "./makeACallStore";
import { RecordingStore } from "../components/recording/store/recording-store";
import { LoginStore } from "../components/login/store/login-store";
import { QRCodeStore } from "../components/qr_code/stroes/qrCodeStore";
import { HistoryStore } from "../components/history/store/history-store";
import axios from 'axios';
import { LocaleLoader } from "../shared/lib/lingui/locale-loader";

const localeLoader = new LocaleLoader();

export class WebRtcRootStore {
    apiClient = new ApiClient(axios
    );
    authStore = new AuthStore(this.apiClient)
    dialerStore = new DialerStore(this.apiClient)
    historyStore = new HistoryStore(this.apiClient)
    recordingStore = new RecordingStore(this.apiClient)
    loginStore = new LoginStore(this.apiClient, this.authStore, localeLoader)
    qrCodeStore = new QRCodeStore(this.apiClient)
    makeACallStore= new MakeACallStore()
}
