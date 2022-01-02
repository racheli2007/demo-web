// @ts-nocheck
import { FORM_ERROR, SubmissionErrors } from 'final-form';
// import { isEmpty } from 'lodash';

export type FormSubmitResponse<T> =
    |  {err: SubmissionErrors; response: null }
    |  {err: null; response: T };

export const handleFormSubmit = async <T>(request: Promise<T>): Promise<FormSubmitResponse<T>> => {
    try {
        const response = await request;
        return { response: response, err: null };
    } catch (err) {
        if(err.err)
        {
            return{
                response: null,
                err: { [FORM_ERROR]: err.err },
            }
        }
        if (!err.response || !err.response.data) {
            return {
                    response: null,
                    err: { [FORM_ERROR]: 'Server side error. Please contact the support.' },
            };
        }
        return {  response: null ,err: {[FORM_ERROR]:err.response.data.message},};
    }
};

// function matchStringifiedArrayOfEntities(
//     string: string
// ): { arrayName: string; index: number; itemName: string } | null {
//     const match = string.match(/(.+)\[(\d+)]\.(.+)/i);

//     return match ? { arrayName: match[1], index: parseInt(match[2]), itemName: match[3] } : null;
// }

// function errorProcess(responseData) {
//     if (responseData.code && responseData.code === 401) {
//         return { [FORM_ERROR]: responseData.message };
//     }
//     let res = {};
//     if (responseData && responseData.violations) {
//         for (let list of responseData.violations) {
//             if (list.propertyPath) {
//                 const match = matchStringifiedArrayOfEntities(list.propertyPath);
//                 if (match) {
//                     const realArray: Array<{}> = [];
//                     if (match.index > 0) {
//                         for (let i = 0; i < match.index; i++) {
//                             realArray.push({});
//                         }
//                     }
//                     realArray.push({ [match.itemName]: list.message });
//                     res[match.arrayName] = realArray;
//                 } else {
//                     res[list.propertyPath] = list.message;
//                 }
//             } else {
//                 res[FORM_ERROR] = list.message;
//             }
//         }
//         if (isEmpty(res)) {
//             res[FORM_ERROR] = responseData['hydra:description'];
//         }
//     } else if (responseData && responseData.error) {
//         res[FORM_ERROR] = 'Server side error. Please contact the support.';
//     } else if (responseData && responseData['hydra:description']) {
//         res[FORM_ERROR] = responseData['hydra:description'];
//     }

//     return isEmpty(res) ? null : res;
// }
