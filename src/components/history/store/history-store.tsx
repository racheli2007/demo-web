import { handleFormSubmit } from "../../../lib/final-form/final-form";
import { ApiClient } from "../../../shared/api/api-client";

export type HistoryForm = {
  start: string | number;
  startTime: string;
  end: string | number;
  endTime: string;
  recurse: number;
  customer?: string;
  status: string;
  direction?: string;
  smatch: string;
  snumber:string;
  callername_match: string;
  callername_number:string;
  cmatch: string;
  cnumber: string;
  phone: string|undefined;
  talktime_minimum: number;
  talktime_maximum:number;
  minCost:string;
  maxCost:string;
  costTo:string;
  taxesInCosts:string;
  groupBy:string;
  sort:string;
  descending:string;
};

export type HistoryCall={
   scustomer  : string;
   recording  :string;
   outgroup_name  :  string;
   bill_type  : string;
   overmax  : string;
   callerid_external  : string;
   cost_including_tax  : string;
   dtype  :  string;
   totaltime  :string;
   snumber_name  :  string;
   dnumber  :  string;
   spresent  : string;
   media  :  string;
   cnumber_display  : string;
   plan  : string;
   dnumber_display  : string;
   cost  :string;
   ctype  :string;
   messages  : string;
   ingroup_time  :  string;
   owner_cost  :  string;
   uniqueid  : string;
   archived  :string;
   end  :  1625114750 ,
   outgroup  :string;
   ingroup  :  string;
   callername_external  :string;
   balance  :string;
   invoice  : string;
   dcustomer  :string;
   cnumber  :  string;
   customer_name  :  string;
   start  : string;
   snumber  : string;
   snumber_display  :  string;
   dnumber_name  : string;
   time  : string;
   status  : string;
   stype  :string;
   channel  :  string;
   cnumber_name  : string;
   callerid_internal  : string;
   currency  :  string;
   owner_currency  : string;
   sname  :string;
   cost_excluding_tax  : string;
   messages_used  :string;
   callid  :  string;
   callername_internal  : string;
   machine  :  string;
   seconds_used  : string;
   bridged_callid  :  string;
   owner_cost_including_tax  : string;
   asteriskid  :  string;
   bill_ref  :  string;
   note  :   string;
   outgroup_time  :  string;
   customer  : string;
   talktime  :  string;
   peer  : string;
   owner_cost_excluding_tax  :  string;
}
export class HistoryStore {
  constructor(public apiClient: ApiClient){}

  historyForm?: HistoryForm;

  submitHistorySearchForm = async (form: HistoryForm) => {
    console.log("form",form)
    const response = await handleFormSubmit(
      this.apiClient.searchHistory(form)
    );

    return response;
  };
}