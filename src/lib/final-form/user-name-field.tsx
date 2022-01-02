import {FieldRenderProps} from "react-final-form";


type Props<T> = FieldRenderProps<T, HTMLInputElement>;

export const InputUsername = <T extends string | number>(props: Props<T>) => {
    const {meta, input} = props;

    return <>
         <input
            value={input.value?input.value:props.value}
            onChange={input.onChange}
        />
        {(meta.touched && meta.error) ||( meta.submitError &&
        props.placeholder==="CreateAccountBasicInfo"&&
         <div className={props.language?"errMsgNumberHB-CreateAccountBasicInfo":"errMsg"}>{(meta.error) || (meta.submitError)}</div>)}
           {(meta.touched && meta.error) ||( meta.submitError &&
        props.placeholder!=="CreateAccountBasicInfo"&&
         <div className={props.language?"errMsgNumberHB":"errMsg"}>{(meta.error) || (meta.submitError)}</div>)}
        </>
}