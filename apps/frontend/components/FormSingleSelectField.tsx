import { ErrorMessage, useFormikContext } from "formik";
import Select, { ActionMeta } from "react-select";

export const FormSingleSelectFormikField = ({
  fieldId,
  fieldLabel,
  options,
  isInline,
}: {
  fieldId: string;
  fieldLabel: string;
  options: { value: string; label: string }[];
  isInline?: boolean;
}) => {
  const { values, setFieldValue, getFieldProps } = useFormikContext();
  const value = getFieldProps(fieldId).value;

  return (
    <>
      <FormSingleSelectField
        fieldId={fieldId}
        fieldLabel={fieldLabel}
        onChange={(option) => {
          setFieldValue(fieldId, option?.value);
        }}
        options={options}
        value={value}
        isInline={isInline}
      />
      <ErrorMessage className="text-red-500 text-xs mt-1" name={fieldId} />
    </>
  );
};

export const FormSingleSelectField = ({
  fieldId,
  fieldLabel,
  options,
  isInline,
  onChange,
  value,
}: {
  fieldId: string;
  fieldLabel: string;
  options: { value: string; label: string }[];
  isInline?: boolean;
  onChange:
    | ((
        newValue: { value: string; label: string },
        actionMeta: ActionMeta<any>
      ) => void)
    | undefined;
  value: string;
}) => {
  const getValue = () => {
    if (value) {
      return options.filter((option) => option.value === value);
    } else {
      return [];
    }
  };
  return (
    <label
      className={`mb-4 input-group w-full text-sm ${
        isInline ? "flex-row" : "flex-col"
      }`}
    >
      <div className="label w-full pb-1">{fieldLabel}</div>
      <Select
        components={{
          IndicatorSeparator: null,
        }}
        name={fieldId}
        onChange={onChange as any}
        isMulti={false}
        value={getValue()}
        className="selectContainerWrapper"
        classNamePrefix="react-select"
        options={options}
      />
    </label>
  );
};
