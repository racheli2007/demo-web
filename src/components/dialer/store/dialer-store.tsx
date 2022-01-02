import { handleFormSubmit } from "../../../lib/final-form/final-form";
import { Extension } from "../../../shared/model/user-onboarding";
import  {ApiClient}  from '../../../shared/api/api-client';
import  {Call}  from '../../../shared/model/call';



export class DialerStore {
  constructor(
    public apiClient:  ApiClient,
  ){}
  getActivecalls = async () => {

    const response = await handleFormSubmit(this.apiClient.getActiveCalls()) ;
    return response;

  };

  isActive = async (activeCalls: Call[], ex: Extension) => {
    if (activeCalls)
      for (var i = 0; i < activeCalls.length; i++) {
        if (
          activeCalls[i].called === ex.name ||
          activeCalls[i].caller === ex.name
        ) {
          return true;
        }
      }
    return false;
  };
}