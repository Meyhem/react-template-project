import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { Button } from '../components/Button'
import { Flex } from '../components/FlexBox'
import { InputField } from '../form/InputField'
import { useApi } from '../hooks/useApi'
import { AuthActions } from '../redux/auth'
import { themeColor, themeSpace } from '../theme'
import { AxiosApiResponse } from '../utils/types'

const LoginPageContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;
`

const LoginFormContainer = styled.div`
  display: flex;

  border: 1px solid ${themeColor('borderPrimary')};
  border-radius: 5px;
  padding: ${themeSpace(3)};
`

const SubmitButton = styled(Button)`
  margin-top: 16px;
`

export const LoginPage = () => {
  const d = useDispatch()
  const { loading, request } = useApi<AxiosApiResponse<{ token: string }>>({ cancelPrevious: true })

  return (
    <LoginPageContainer>
      <LoginFormContainer>
        <Form<{ user: string }>
          initialValues={{ user: '' }}
          // eslint-disable-next-line no-console
          onSubmit={async v => {
            try {
              const resp = await request({
                method: 'post',
                url: '/api/user/token',
                data: { userId: v.user }
              })
              d(AuthActions.setToken({ token: resp.data.data.token }))
            } catch (e) {}
          }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <InputField name="user" label="User" placeholder="User" />

              <Flex justifyContent="center">
                <SubmitButton loading={loading} disabled={loading} htmlType="submit" variant="primary">
                  Go
                </SubmitButton>
              </Flex>
            </form>
          )}
        />
      </LoginFormContainer>
    </LoginPageContainer>
  )
}
