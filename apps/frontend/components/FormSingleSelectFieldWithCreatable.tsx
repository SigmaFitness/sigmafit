import { ErrorMessage, useFormikContext } from "formik";
import Creatable from "react-select/creatable";

export const FormSingleSelectFieldWithCreatable = ({
  fieldId,
  fieldLabel,
  options,
  isInline,
  setIsCreateNewWorkoutModalOpenAndPassInitValue,
}: {
  fieldId: string;
  fieldLabel: string;
  options: { value: string; label: string }[];
  isInline?: boolean;
  setIsCreateNewWorkoutModalOpenAndPassInitValue: ({
    state,
    initialValue,
  }: {
    state: boolean;
    initialValue: string;
  }) => void;
}) => {
  const { setFieldValue, getFieldProps } = useFormikContext();
  const value = getFieldProps(fieldId).value;

  const getValue = () => {
    if (value) {
      return options.filter((option) => value.indexOf(option.value) >= 0);
    } else {
      return [];
    }
  };

  return (
    <>
      <label
        className={`mb-4 input-group w-full text-sm ${
          isInline ? "flex-row" : "flex-col"
        }`}
      >
        <div className="label  w-full pb-1">{fieldLabel}</div>
        <Creatable
          onCreateOption={(val) => {
            // show the dialog box
            setIsCreateNewWorkoutModalOpenAndPassInitValue({
              state: true,
              initialValue: val,
            });
            // ask the user to
          }}
          components={{
            IndicatorSeparator: null,
          }}
          name={fieldId}
          onChange={(option) => {
            setFieldValue(fieldId, option?.value);
          }}
          isMulti={false}
          value={getValue()}
          styles={{
            option: (provided, state) => ({
              ...provided,
              background: "#fffcee",
              padding: "0.625em",
              paddingRight: "8px",
              paddingLeft: "8px",
              border: "1px solid black",
              color: state.isSelected ? "red" : "blue",
            }),
            menuList: (provided, state) => ({
              ...provided,
              // background: 'red',
              background: "#fffcee",
              padding: 0,
            }),
            control: (provided, state) => ({
              ...provided,
              // none of react-select's styles are passed to <Control />
              outline: "none",
              borderRadius: "0",
              border: "1px solid black",
              borderColor: "black",
            }),
          }}
          options={options}
        />

        <ErrorMessage className="text-red-500 text-xs mt-1" name={fieldId} />
      </label>
    </>
  );
};
