import React from "react";
import "./form-input.styles.scss";

export default function FormInputComponent({ label, ...otherProps }) {
  return (
    <div className="group">
        {/* make the input label above the label to make the function from scss works  */}
        <input className="form-input" {...otherProps} />
        {/* otherPropsValue mean if the user type something in input automatically make the label shriik otherwise it will not */}
        {/* if label exist it will render the existing label  */}
        {
            label && (
            <label className={`${otherProps.value.length ? "shrink" : "" } form-input-label`}>{label}</label>
            )
        }
      {/* <input type="text" required name="displayName" value={ displayName } onChange={ changeHandler }/> */}
    </div>
  );
}
