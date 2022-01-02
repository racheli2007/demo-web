import { useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import { HistoryForm } from "./store/history-store";
import { SelectField } from "../../lib/final-form/selectc-field";
import { useWebRtcStore } from "../../stores/use-webrtc-store";


type Props = {
  setHistoryCalls: any;
};

export const HistorySearchForm = (props: Props) => {
  const { authStore, historyStore } = useWebRtcStore()

  const { setHistoryCalls } = props;
  const [errors, setErrors] = useState<string>("")
  const [params, setParams] = useState<HistoryForm>({
    start: new Date().toISOString().slice(0, 10),
    startTime: "00:00:00",
    end: new Date().toISOString().slice(0, 10),
    endTime: "23:59:59",
    recurse: 0,
    status: "",
    smatch: "contains",
    snumber: "",
    callername_match: "contains",
    callername_number: "",
    cmatch: "contains",
    cnumber: "",
    phone: authStore.extension?.name,
    talktime_minimum: 0,
    talktime_maximum: -1,
    minCost: "",
    maxCost: "",
    costTo: "",
    taxesInCosts: "0",
    groupBy: "",
    sort: "start",
    descending: "0",
  });

  const onSubmit = (values: HistoryForm) => {
    setParams(values);
  };

  useEffect(() => {
    const updateHistorycalls = async () => {
      let historyCalls = await historyStore.submitHistorySearchForm({
        ...params,
        start:
          new Date(
            Date.parse(`${params.start}T${params.startTime}`)
          ).getTime() / 1000,
        end:
          new Date(Date.parse(`${params.end}T${params.endTime}`)).getTime() /
          1000,
      });
      if (historyCalls.err) {
        setErrors(historyCalls.err["FINAL_FORM/form-error"])
        setHistoryCalls([]);

      } else {
        setHistoryCalls(historyCalls.response);
        setErrors("");
      }
    };
    updateHistorycalls();
  }, [params, setHistoryCalls,historyStore]);

  const customer = {
    "": "My customer",
    all: "All our customers",
    prepaid: "All pre-paid customers",
    postpaid: "All post-paid customers",
    external: "All externally billed customers",
  };
  const recurse = {
    "1": "Yes",
    "0": "No",
  };
  const status = {
    answer: "Answer",
    "": "No answer",
  };
  const direction = {
    "": "Any",
    internal: "Internal",
    in: "Inbound",
    out: "Outbound",
  };
  const smatch = {
    exact: "Exact",
    start: "Starts with",
    end: "Ends with",
    contains: "Contains",
  };

  const callername_match = smatch;
  const cmatch = smatch;

  const costTO = {
    "": "My customer",
    scustomer: "Customer making the call",
  };

  const taxesInCosts = {
    "1": "Yes",
    "0": "No",
  };

  const groupBy = {
    "": "None",
    "1": "Day",
    "2": "Month",
    "3": "Customer",
    "4": "Customer and type",
    "5": "Customer, type, and number",
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

  const descending = {
    "0": "Ascending",
    "1": "Descending",
  };
  return (
    <div>
      <Form<HistoryForm>
        onSubmit={onSubmit}
        initialValues={{
          start: new Date().toISOString().slice(0, 10),
          startTime: "00:00:00",
          end: new Date().toISOString().slice(0, 10),
          endTime: "23:59:59",
          recurse: 0,
          status: "",
          smatch: "contains",
          snumber: "",
          callername_match: "contains",
          callername_number: "",
          cmatch: "contains",
          cnumber: "",
          phone: authStore.extension?.name,
          talktime_minimum: 0,
          talktime_maximum: -1,
          minCost: "",
          maxCost: "",
          costTo: "",
          taxesInCosts: "0",
          groupBy: "",
          sort: "start",
          descending: "0",
        }
        }
        render={({ submitErrors, handleSubmit, form, submitting, pristine, values }) => (<form onSubmit={handleSubmit}>
          <div>
            <div className="search-field">
              <label>Start date: </label>
              <Field name="start" component="input" type="date" />{" "}
              <label> Start time: </label>
              <Field
                name="startTime"
                component="input"
                type="time"
                step="1"
              />
            </div>
            <div className="search-field">
              <label>End date: </label>
              <Field name="end" component="input" type="date" />
              <label> End time: </label>
              <Field name="endTime" component="input" type="time" step="1" />
            </div>
            <SelectField
              label={"Include sub-customers recursively: "}
              name={"recurse"}
              defaultValue={"0"}
              options={recurse}
            />
            <SelectField
              label={"Customer: "}
              name={"customer"}
              defaultValue={""}
              options={customer}
            />
            <SelectField
              label={"Leg status: "}
              name={"status"}
              defaultValue={"answer"}
              options={status}
            />
            <SelectField
              label={"Leg direction: "}
              name={"direction"}
              defaultValue={""}
              options={direction}
            />
            <SelectField
              label={"Calling number or card match: "}
              name={"smatch"}
              defaultValue={"contains"}
              options={smatch}
            />
            <div className="search-field">
              <label>Calling number or card: </label>
              <Field name="snumber" component="input" value="" />
            </div>
            <SelectField
              label={"Caller name match: "}
              name={"callername_match"}
              defaultValue={"contains"}
              options={callername_match}
            />
            <div className="search-field">
              <label>Caller name: </label>
              <Field name="callername_number" component="input" value="" />
            </div>
            <SelectField
              label={"Called number match: "}
              name={"cmatch"}
              defaultValue={"contains"}
              options={cmatch}
            />
            <div className="search-field">
              <label>Called number: </label>
              <Field name="cnumber" component="input" />
            </div>
            <div className="search-field">
              <label>To or from telephone line: </label>
              <Field name="phone" component="input" />
            </div>
            <div className="search-field">
              <label>Minimum duration (seconds): </label>
              <Field
                name="talktime_minimum"
                component="input"
                type="number"
              />
            </div>
            <div className="search-field">
              <label>Maximum duration (seconds): </label>
              <Field
                name="talktime_maximum"
                component="input"
                type="number"
              />
            </div>
            <div className="search-field">
              <label>Minimum cost ($): </label>
              <Field
                name="minCost"
                component="input"
                type="text"
                value="no limit"
              />
            </div>
            <div className="search-field">
              <label>Maximum cost ($): </label>
              <Field
                name="maxCost"
                component="input"
                type="text"
                value="no limit"
              />
            </div>
            <div className="separator-line" style={{ top: '108.2vh' }}></div>
              _______________________________________________________________________
              <div>
              Show:
                <SelectField
                label={"Show cost to: "}
                name={"costTO"}
                defaultValue={"scustomer"}
                options={costTO}
              />
              <SelectField
                label={"Include taxes in costs: "}
                name={"taxesInCosts"}
                defaultValue={"0"}
                options={taxesInCosts}
              />
            </div>
            <div className="separator-line" style={{ top: '126.5vh' }}></div>
              _______________________________________________________________________
              <div>
              Group and sort:
                <SelectField
                label={"Group by: "}
                name={"groupBy"}
                defaultValue={""}
                options={groupBy}
              />
              <SelectField
                label={"Sort by: "}
                name={"sort"}
                defaultValue={"start"}
                options={sort}
              />
              <SelectField
                label={"Direction: "}
                name={"descending"}
                defaultValue={"0"}
                options={descending}
              ></SelectField>
            </div>
          </div>
          <button type="submit" disabled={submitting}>
            Search
            </button>
          <div className="err">
            {errors}
          </div>

        </form>
        )}
      />
    </div>
  );
};
