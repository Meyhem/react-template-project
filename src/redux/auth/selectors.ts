import jwtDecode from 'jwt-decode'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { RootState } from '../types'

export type TokenPayload = {
  'Luger.Buckets': string
  nameid: string
}

const selectState = (state: RootState) => state.auth

export const getToken = createSelector(selectState, s => s.token)

export const isUserLoggedIn = createSelector(selectState, s => !!s.token)

export const getDecodedToken = createSelector(getToken, t => jwtDecode<TokenPayload>(t))
export const getBuckets = createSelector(getDecodedToken, t => _.split(t['Luger.Buckets'], ','))
export const getUserId = createSelector(getDecodedToken, t => t['nameid'])
