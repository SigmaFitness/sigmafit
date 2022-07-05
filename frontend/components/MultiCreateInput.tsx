import { ErrorMessage, useFormikContext } from "formik"
import { useState } from "react"
import CreatableSelect from 'react-select/creatable';
import { toast } from "react-toastify";




export const MultiCreateInput = ({ fieldId, isInline = false, targetEntity }: { targetEntity: string, fieldId: string, isInline: boolean }) => {
    const { getFieldProps, setFieldValue, getFieldMeta } = useFormikContext()
    const formikValue = getFieldProps(fieldId).value

    const initialValue=getFieldMeta(fieldId).initialValue
    const [currentTextValue, setCurrentTextValue] = useState('')
    const [values, setValues] = useState<any>((initialValue as any[] ?? []).map((e:any) => ({label: e, value: (Math.random()*1000)})))


    const handleKeyDown: any = (event: KeyboardEvent) => {
        if (!currentTextValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                event.preventDefault();
                setCurrentTextValue('')
                setValues([...values, { label: currentTextValue, value: (Math.random() * 1000) }]) // using this Math.random() to ensure uniqueness 
                setFieldValue(fieldId, [...formikValue, currentTextValue])
        }
    };
    return (

        <>


            <label className={`mb-4 input-group w-full text-sm ${isInline ? 'flex-row' : 'flex-col'}`}>
                <div className="label w-full pb-1">
                    Default {targetEntity}
                </div>
                <CreatableSelect
                    isClearable
                    isMulti
                    components={{
                        DropdownIndicator: null,
                    }}
                    inputValue={currentTextValue}
                    menuIsOpen={false}
                    onChange={(newValue) => {
                        setFieldValue(fieldId, newValue.map(e => e.label))
                        setValues(newValue)
                    }}
                    onInputChange={(newValue) => {
                        if(true)setCurrentTextValue(newValue) // check
                        else{
                            toast('Only numeric values are allowed', {type: 'error', autoClose: 100})
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    styles={{
                        control: (base) => ({
                            ...base,
                            'borderRadius': '0',
                            'border': 'none'
                        }),
                        input: (base) => ({
                            ...base,
                            'borderRadius': '0',
                        }),
                        container: (base) => ({
                            ...base,
                            'input:focus': {
                                boxShadow: 'none',
                            },
                            'borderRadius': '0',
                            'border': '1px solid black'
                        }),
                    }}
                    // className="input input-bordered px-2 h-10 border-black rounded-none  w-full "
                    value={values}
                />
                <ErrorMessage
                    className="text-red-500 text-xs mt-1"
                    name={fieldId} />
            </label>





        </>
    )
}
