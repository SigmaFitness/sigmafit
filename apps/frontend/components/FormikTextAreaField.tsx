import { Field, ErrorMessage } from "formik";

export const FormikTextAreaField = ({
  fieldId,
  fieldLabel,
  placeholder,
}: {
  fieldId: string;
  fieldLabel: string;
  placeholder?: string;
}) => {
  return (
    <label className="mb-4 input-group w-full text-sm flex-col">
      <div className="label w-full pb-1">{fieldLabel}</div>
      <Field
        name={fieldId}
        type="textarea"
        id={fieldId}
        as="textarea"
        rows={4}
        autoComplete="off"
        placeholder={placeholder}
        className="textarea textarea-primary"
      />
      <ErrorMessage className="text-red-500 text-xs mt-1" name={fieldId} />
    </label>
  );
};
