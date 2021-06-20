import _ from 'lodash'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getBuckets } from '../../redux/auth/selectors'
import { themeColor } from '../../theme'
import { Routes } from '../../utils/routes'
import { Text } from '../Text'

type LayoutProps = {
  heading?: string
}

const LayoutContainer = styled.div`
  display: flex;
  flex: 1;
`

const Sider = styled.div`
  display: flex;
  flex-direction: column;

  background: ${themeColor('bgSecondary')};
  min-width: 20vw;
`

const SiderItem = styled.div<{ active?: boolean }>`
  padding: 16px 32px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${themeColor('bgPrimary')};
  }
`

const SiderItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${themeColor('borderSecondary')};
  border-bottom: 1px solid ${themeColor('borderSecondary')};
`

const Content = styled.div`
  width: 100%;
  padding: 16px 32px;
`

export const Layout: FC<LayoutProps> = ({ children, heading }) => {
  const buckets = useSelector(getBuckets)
  const { pathname } = useLocation()

  return (
    <LayoutContainer>
      <Sider>
        <Link to={Routes.Dashboard}>
          <SiderItem>
            <Text fontSize="24px">Luger</Text>
          </SiderItem>
        </Link>

        <SiderItemGroup>
          {_.map(buckets, b => {
            const bucketPath = generatePath(Routes.Bucket, { bucket: b })
            const isActiveItem = pathname === bucketPath
            return (
              <Link key={b} to={bucketPath}>
                <SiderItem active={isActiveItem}>
                  {isActiveItem && <>&raquo;</>} Bucket/{b}
                </SiderItem>
              </Link>
            )
          })}
        </SiderItemGroup>
      </Sider>
      <Content>
        {heading && <h1>{heading}</h1>}
        {children}
      </Content>
    </LayoutContainer>
  )
}
