import { handleFormSubmit } from "../../../lib/final-form/final-form";
import { ApiClient } from "../../../shared/api/api-client";
import { RecordingForm } from "../../../shared/model/Record";



export class RecordingStore {
  constructor(
    public apiClient:  ApiClient,
    ){}

  recordingForm?: RecordingForm;

  submitRecordingSearchForm = async (form: RecordingForm) => {
    const response = await handleFormSubmit(this.apiClient.searchRecording(form));
    return response;
  };

  getRecordFile = async (params:any) => {
    const response = await handleFormSubmit(this.apiClient.getRecordFile(params))
    return response;
  };

  getRecordGroupsList=async () => {
    const response = await handleFormSubmit(this.apiClient.getRecordGroupsList())
    return response;
  };

}