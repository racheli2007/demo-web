import { Field, Form } from "react-final-form";
import { useEffect } from "react";
import { RecordGroup ,RecordingForm} from "../../shared/model/Record";
import { useState } from "react";
import {SelectField} from "../../lib/final-form/selectc-field";
import { useWebRtcStore } from "../../stores/use-webrtc-store";

type Props = {
  recordgroup: string;
  setRecording: any;
  recordgroups: RecordGroup[];
};

export const RecordingSearchForm = (props: Props) => {
  const { recordgroup, setRecording, recordgroups } = props;
  const { recordingStore} = useWebRtcStore()

  const [errors,setErrors]=useState<string>("")
  const [params, setParams] = useState<RecordingForm>({
    recordgroup: recordgroup,
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
    complete: 1,
    caller: "",
    called: "",
    totaltime_minimum: 0,
    totaltime_maximum: -1,
    sort: "start",
    descending: 0,
  });

  const recordgroupoptions: { [key: string]: string } = {
    "": "All record groups",
  };

  recordgroups.forEach((recordgroup: RecordGroup) => {
    recordgroupoptions[recordgroup.id] = recordgroup.name;
  });

  const complete = {
    "1": "Complete only",
    "0": "In progress only",
    "-1": "Both complete and in progress",
  };

  const sort = {
    direction: "Direction",
    snumber: "caller",
    cnumber: "called",
    start: "Start date and Time",
    end: "End date and Time",
    talktime: "Billable time",
    cost: "cost",
  };

  const descending = { "0": "Ascending" ,  "1": "Descending" };

  const onSubmit = (values: RecordingForm) => {
    setParams(values);
  };

  useEffect(() => {
    const updateRecordings = async () => {
      let recordings = await recordingStore.submitRecordingSearchForm({
        ...params,
        start:
          new Date(Date.parse(`${params.start}T00:00:00`)).getTime() / 1000,
        end: new Date(Date.parse(`${params.end}T23:59:59`)).getTime() / 1000,
      });
      if (recordings.err)
      {
        setErrors(recordings.err["FINAL_FORM/form-error"]);
        setRecording([])
      }
      else{
        setRecording(recordings.response);
        setErrors("");
      }
      
    };
    updateRecordings();
  }, [params, setRecording,recordingStore]);

  return (
    <div>
      <Form<RecordingForm>
        onSubmit={onSubmit}
        initialValues={{
          start: new Date().toISOString().slice(0, 10),
          end: new Date().toISOString().slice(0, 10),
          recordgroup: recordgroup,
          complete: 1,
          caller: "",
          called: "",
          totaltime_minimum: 0,
          totaltime_maximum: -1,
          sort: "start",
          descending: 0,
        }}
        // initialValues={recordingStore.recordingForm}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="search-field">
              <label>Start date:</label>
              <Field name="start" component="input" type="date" />
            </div>
            <div className="search-field">
              <label>End date:</label>
              <Field name="end" component="input" type="date" />
            </div>
            <SelectField
              label={"Record group:"}
              name={"recordgroup"}
              defaultValue={recordgroup}
              options={recordgroupoptions}
            />
            <SelectField
              label={"Completed:"}
              name={"complete"}
              defaultValue={"1"}
              options={complete}
            />
            <div className="search-field">
              <label>Calling number contains:</label>
              <Field name="caller" component="input" type="text" />
            </div>
            <div className="search-field">
              <label>Called number contains:</label>
              <Field name="called" component="input" type="text" />
            </div>
            <div className="search-field">
              <label>Minimum duration (seconds):</label>
              <Field name="totaltime_minimum" component="input" type="number" />
            </div>
            <div className="search-field">
              <label>Maximum duration (seconds):</label>
              <Field
                name="totaltime_maximum"
                component="input"
                type="number"
                placeholder="No Limit"
              />
            </div>
            <div>
              _______________________________________________________________________
              <div className="separator-line" style={{top:'64.7vh'}}></div>
            </div>
            
            <div>
              <label>sort</label>
              <SelectField
                label={"Sort by:"}
                name={"sort"}
                defaultValue={"start"}
                options={sort}
              />
              <SelectField
                label={"Direction:"}
                name={"descending"}
                defaultValue={"0"}
                options={descending}
              />
            </div>
            <button type="submit" disabled={submitting}>
              Update
            </button>
            {errors === "" ? null : <p>{errors}</p>}
          </form>
        )}
      />
    </div>
  );
};