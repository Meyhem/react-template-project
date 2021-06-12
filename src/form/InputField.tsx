import { Field } from 'react-final-form'
import { FormControl, FormControlProps } from '../components/FormControl'
import { Input, InputProps } from '../components/Input'

type InputFieldProps = {
  name: string
} & Partial<FormControlProps<InputProps>>

export const InputField = ({ name, additionalProps, ...rest }: InputFieldProps) => (
  <Field
    name={name}
    render={p => (
      <FormControl<InputProps>
        {...p}
        component={Input}
        size="middle"
        htmlType="text"
        additionalProps={{ autoComplete: 'off', ...additionalProps }}
        {...rest}
      />
    )}
  />
)
