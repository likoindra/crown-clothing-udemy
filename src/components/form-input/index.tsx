import { InputHTMLAttributes, FC} from "react";
import { FormInputLabel, Input, Group } from "./form-input.styles";

// FormInputProps type 
export type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>

const FormInputComponent: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      {/* make the input label above the label to make the function from scss works  */}
      <Input {...otherProps} />
      {/* otherPropsValue mean if the user type something in input automatically make the label shriik otherwise it will not */}
      {/* if label exist it will render the existing label  */}
      {label && (
        <FormInputLabel
          // pass the shrink function to use in styling 

          // Define otherProps as Boolean
          shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}
          // className={`${
          //   otherProps.value.length ? "shrink" : ""
          // } form-input-label`}
        >
          {label}
        </FormInputLabel>
      )}
      {/* <input type="text" required name="displayName" value={ displayName } onChange={ changeHandler }/> */}
    </Group>
  );
}

export default FormInputComponent;
