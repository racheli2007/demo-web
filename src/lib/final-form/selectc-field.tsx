import { Field } from "react-final-form";


type Props = {
  label: string;
  name: string;
  defaultValue: string | number;
  options:{ [key: string]: string; };
};

export const SelectField = (props: Props) => {
  const { label, name, defaultValue, options } = props;



  return (
    <div className="search-field">
      <label>{label}</label>
      <Field name={name} component="select" defaultValue={defaultValue}>
        {  Object.entries(options).map(([value, description]) => (
    <option key={value + description} value={value}>
      {description}
    </option>
  ))}
        )
      </Field>
    </div>
  );
};