import { ChangeEventHandler, FC, Fragment, forwardRef } from "react";
import { bem } from "../../utils/bem";
import "./CheckBox.scss";
import clsx from "clsx";

function formatError(error: string, label?: string) {
  return (
    <div className="error">
      <div>{label}</div>
      <div>{error}</div>
    </div>
  );
}
interface ICheckBoxProps {
  label?: string;
  name?: string;
  error?: string;
  validationError?: (name?: string) => string | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  className?: string;
  readonly?: boolean;
  checked?: boolean;
}

const b = bem("checkbox");
export const CheckBox : FC<ICheckBoxProps> = forwardRef(({checked, onChange,
  name, className, autoFocus = false, readonly = false, label, error }, ref: any) => {

  return (<Fragment>
    <label className={clsx(b(), className)}>
      <input
        id={name}
        name={name}
        className={b("input")}
        readOnly={readonly}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        ref={ref}
        autoFocus={autoFocus}
        autoComplete="on"
      />
      <span className={b("checkmark")}></span>
      {label && <span className={b("label")}>{label}</span>}
    </label>
    {error && <div>{formatError(error, label)}</div>}
  </Fragment>)
});
