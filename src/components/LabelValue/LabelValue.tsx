import _ from 'lodash'
import styled from 'styled-components/macro'
import { Flex } from '../FlexBox'
import { Text, TextProps } from '../Text'

const Wrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

type Props = {
  label?: string
  labelProps?: TextProps
  valueProps?: TextProps
  value?: string
}

export const LabelValue: React.FC<Props> = ({ label, labelProps, value, valueProps, children }) => {
  return (
    <Wrapper>
      {label && (
        <Text color="primary" bold {...labelProps} marginBottom="8px">
          {label}
        </Text>
      )}
      {!_.isEmpty(value) && (
        <Text {...valueProps} fontSize="16px">
          {value}
        </Text>
      )}

      {children}
    </Wrapper>
  )
}
