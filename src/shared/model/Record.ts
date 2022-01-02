export type Record = {
    scustomer: string;
    dtype: string;
    totaltime: string;
    snumber_name: string;
    dnumber: string;
    spresent: string;
    cnumber_display: string;
    dnumber_display: string;
    ctype: string;
    uniqueid: string;
    end: string;
    dcustomer: string;
    cnumber: string;
    snumber: string;
    start: string;
    snumber_display: string;
    status: string;
    stype: string;
    dnumber_name: string;
    callerid_internal: string;
    cnumber_name: string;
    size: string;
    callid: string;
    machine: string;
    path: string;
    stale: string;
    asteriskid: string;
    recordid: string;
    talktime: string;
    recordgroup: string;
    expires: string;
    complete: string;
  };

  export type RecordGroup = {
    request: string;
    owner: string;
    record_in: string;
    name: string;
    fraction: string;
    description: string;
    mix: string;
    email: string;
    format: string;
    customer: string;
    id: string;
    record_out: string;
    expires: string;
  };

  export type RecordingForm = {
    recordgroup: string;
    start: number | string;
    end: number | string;
    complete: number;
    caller: string;
    called: string;
    totaltime_minimum: number;
    totaltime_maximum: number;
    sort: string;
    descending: number;
  };
  
  
  export type RecordFile = {
    recordgroup: string;
    uniqueid: string;
    recordid: string;
    encoding: string;
  };