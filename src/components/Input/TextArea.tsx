import React from 'react'
import { Input as AntInput } from 'antd'
import { TextAreaProps as AntTextAreaProps } from 'antd/lib/input'

const { TextArea: AntTextArea } = AntInput

export type TextAreaProps = AntTextAreaProps & { error?: any }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TextArea = ({ error, ...rest }: TextAreaProps) => {
  return <AntTextArea {...rest} />
}
