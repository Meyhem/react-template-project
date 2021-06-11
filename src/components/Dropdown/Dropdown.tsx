import React from 'react'
import { Dropdown as AntDropdown } from 'antd'
import { DropDownProps as AntDropDownProps } from 'antd/lib/dropdown'

export type DropdownProps = React.PropsWithChildren<AntDropDownProps>

export const Dropdown = ({ children, ...rest }: DropdownProps) => {
  return <AntDropdown {...rest}>{children}</AntDropdown>
}
