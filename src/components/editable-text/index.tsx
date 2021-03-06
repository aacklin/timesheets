import * as React from 'react';
import { TextField, TextFieldProps } from '@rmwc/textfield';

export interface IEditableTextFieldProps {
    readonly edit: TextFieldProps & { 
        onCancel?: () => void; 
        onChange: (value: string) => void;
    },
    readonly read?: React.HTMLProps<HTMLDivElement>,
    readonly editMode: boolean,
}

const EditableTextField = React.forwardRef((props: IEditableTextFieldProps, ref?: any) => {
    const { editMode, edit: { value, onCancel, type, onChange } } = props;
    const [textFieldValue, setTextFieldValue] = React.useState(value);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.currentTarget.value);
    };    

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (e.key) {
            case "Enter":
                onChange && onChange((e.currentTarget as HTMLInputElement).value);
                break;
            case "Escape":
                onCancel && onCancel();
                break;
            default:
                break;
        }
    };

    const onBlur = (e: React.FocusEvent) => {
        const textBoxEl = (e.currentTarget as HTMLInputElement);
        onChange && onChange(textBoxEl.value);
    };

    const jsx = editMode
        ? <TextField
            style={{
                height: "40px",
                maxWidth: "120px"
            }}
            onBlur={onBlur}
            autoFocus={true}
            type={type}
            onKeyPress={onKeyPress}
            onChange={onInputChange}
            ref={ref}
            value={textFieldValue}
            step={0.5}
            />
        : <>{value}</>;

    return jsx;
});

export default EditableTextField;
