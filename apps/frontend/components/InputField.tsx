import { ErrorMessage, Field } from "formik";

export const FormInputField = ({
  fieldId,
  fieldLabel,
  placeholder,
  isInline,
  type = "text",
}: {
  fieldId: string;
  placeholder?: string;
  isInline?: boolean;
  fieldLabel: string;
  type?: string;
}) => (
  <label
    className={`mb-4 input-group w-full text-sm ${
      isInline ? "flex-row" : "flex-col"
    }`}
  >
    <div className="label w-full pb-1">{fieldLabel}</div>
    <Field
      name={fieldId}
      type={type}
      id={fieldId}
      autoComplete="off"
      placeholder={placeholder}
      className="input input-bordered px-2 h-10 border-black bg-slate-50 w-full"
    />
    <ErrorMessage className="text-red-500 text-xs mt-1" name={fieldId} />
  </label>
);
