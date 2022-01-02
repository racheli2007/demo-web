import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { FieldRenderProps } from "react-final-form";

type Props<T> = FieldRenderProps<T, HTMLInputElement>;
export const InputField = <T extends string | number>(props: Props<T>) => {
  const { meta, input } = props;

  return (
    <>
      <Input
        //  accept={props.inputAccept}
        type={props.inputType}
        value={input.value}
        onChange={input.onChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        style={props.style}
        autoFocus={props.autoFocus}
        startAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
      {(meta.touched && meta.error) ||
        (meta.submitError &&
          props.partnersRepresentativeInfo === "partnersRepresentativeInfo" && (
            <div
              className={
                props.language
                  ? "err-partnersRepresentativeInfoHB"
                  : "err-partnersRepresentativeInfo"
              }
            >
              {meta.error || meta.submitError}
            </div>
          ))}
      {(meta.touched && meta.error) ||
        (meta.submitError && props.placeholder === "Company Address" && (
          <div
            className={
              props.urlInput && props.language
                ? "urlerrorHB"
                : props.urlInput
                ? "urlerror"
                : props.language
                ? "errMsgCreate1HB"
                : "errMsg"
            }
          >
            {meta.error || meta.submitError}
          </div>
        ))}
      {(meta.touched && meta.error) ||
        (meta.submitError && props.placeholder === "www.bezeq.co.il" && (
          <div
            className={
              props.urlInput && props.language
                ? "urlerrorHB"
                : props.urlInput
                ? "urlerror"
                : props.language
                ? "errMsgCreate1HB"
                : "myerror"
            }
          >
            {meta.error || meta.submitError}
          </div>
        ))}
      {(meta.touched && meta.error) ||
        (meta.submitError &&
          props.placeholder !== "Company Address" &&
          props.placeholder !== "www.bezeq.co.il" &&
          props.partnersRepresentativeInfo !== "partnersRepresentativeInfo" && (
            <div className={props.language ? "errMsgHB" : "errMsg"}>
              {meta.error || meta.submitError}
            </div>
          ))}
    </>
  );
};
