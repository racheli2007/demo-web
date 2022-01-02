
import { handleFormSubmit } from "../../../lib/final-form/final-form";
import { ApiClient } from "../../../shared/api/api-client";


export class QRCodeStore {
    constructor(
        public apiClient: ApiClient,
    ) {

    }
    audioInputSelect = document.querySelector('select#audioSource');
    selectors = [this.audioInputSelect];
    getHotlineDetails = async (id:string) => {
        const response = await handleFormSubmit(this.apiClient.getHotlineDetails(id)) ;
        return response;
    
      }; 


}