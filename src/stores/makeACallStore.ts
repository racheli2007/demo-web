import { connectWebrtc, hangup, call, domain } from "../sip/sip";

export class MakeACallStore {

     onLoad = async() => {
        await connectWebrtc().catch(err => {
            console.log(err)
        });
    }

    call= async (to:string) => {
        await call(`sip:${to}@${domain}`).catch(err => {
            console.log(err)
        });
    };

     hangup = async () => {
        await hangup().catch(err => {
            console.log(err)
        });
    };

}