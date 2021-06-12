import _ from 'lodash'
import React, { FunctionComponent } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import { LocalizedMessage } from '../../form/validation'
import { Flex, FlexProps } from '../FlexBox'
import { Text, TextProps } from '../Text'
import { themeColor } from '../../theme'

export interface FormControlProps<T> extends FieldRenderProps<T>, FlexProps {
  component: React.ComponentType<{ error?: any; type: string } & T>
  hideValidationMessage?: boolean
  label?: string
  labelProps?: TextProps
  htmlType?: string
  additionalProps?: T
}

const StyledFormControl = styled(Flex)<FormControlProps<unknown>>`
  width: 100%;
  flex-direction: column;
`

const Error = styled.div`
  color: ${themeColor('danger')};
  font-weight: bold;
`

export const FormError: FunctionComponent<{ localizedMessage?: LocalizedMessage; label?: string }> = ({
  localizedMessage,
  label
}) => {
  const { t } = useTranslation('validation')
  const { translationKey, defaultMessage, interpolation } = localizedMessage || {}

  return (
    <Error>
      {t(`${translationKey}`, {
        defaultValue: defaultMessage,
        label,
        ...interpolation
      })}
    </Error>
  )
}

export const FormControl = <A extends unknown = any>({
  label,
  labelProps,
  component,
  hideValidationMessage,
  input,
  meta,
  htmlType = '',
  additionalProps,
  ...props
}: FormControlProps<A>) => {
  const Component = component

  const trimmedLabel = _.trimEnd(label)
  const metaErr = meta.error || meta.submitError

  return (
    <StyledFormControl {...props}>
      {label && (
        <Text color="primary" bold {...labelProps} marginBottom="8px">
          {label}
        </Text>
      )}
      <Component {...input} error={meta.touched && metaErr} {...props} type={htmlType} {...additionalProps} />
      {meta.touched && metaErr && !hideValidationMessage && (
        <FormError
          localizedMessage={metaErr}
          label={_.endsWith(trimmedLabel, '*') ? trimmedLabel.slice(0, -1) : trimmedLabel}
        />
      )}
    </StyledFormControl>
  )
}
