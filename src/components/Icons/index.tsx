import React from 'react'
import styled from 'styled-components/macro'
import {
  BorderOutlined as AntBorderOutlined,
  CheckSquareOutlined as AntCheckSquareOutlined,
  DownOutlined as AntDownOutlined,
  UpOutlined as AntUpOutlined,
  CloseOutlined as AntCloseOutlined,
  CheckOutlined as AntCheckOutlined,
  LockFilled as AntLockFilled,
  UnlockFilled as AntUnlockFilled,
  UserOutlined as AntUserOutlined,
  ApartmentOutlined as AntApartmentOutlined,
  TeamOutlined as AntTeamOutlined,
  IdcardOutlined as AntIdcardOutlined,
  ShopOutlined as AntShopOutlined
} from '@ant-design/icons'
import { Color } from '../../theme'

type IconProps = { color?: string; fontSize?: string; size?: { width?: string; height?: string } }

function asStyledIcon(iconComponent: React.ComponentType<Omit<IconProps, 'size'>>) {
  return styled(iconComponent)`
    // @ts-ignore
    color: ${({ color, theme }) => theme.colors[(color as Color) || 'primary']};
    ${({ fontSize }) =>
      fontSize &&
      `
      font-size: ${fontSize};
    `}
  `
}

export const BorderOutlined = asStyledIcon(AntBorderOutlined)
export const CheckSquareOutlined = asStyledIcon(AntCheckSquareOutlined)
export const DownOutlined = asStyledIcon(AntDownOutlined)
export const UpOutlined = asStyledIcon(AntUpOutlined)
export const CloseOutlined = asStyledIcon(AntCloseOutlined)
export const CheckOutlined = asStyledIcon(AntCheckOutlined)
export const LockFilled = asStyledIcon(AntLockFilled)
export const UnlockFilled = asStyledIcon(AntUnlockFilled)
export const UserOutlined = asStyledIcon(AntUserOutlined)
export const ApartmentOutlined = asStyledIcon(AntApartmentOutlined)
export const TeamOutlined = asStyledIcon(AntTeamOutlined)
export const IdCardOutlined = asStyledIcon(AntIdcardOutlined)
export const ShopOutlined = asStyledIcon(AntShopOutlined)
