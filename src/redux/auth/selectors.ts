import { createSelector } from 'reselect'
import { RootState } from '../types'

const selectState = (state: RootState) => state.auth

export const getToken = createSelector(selectState, s => s.token)

export const isUserLoggedIn = createSelector(selectState, s => !!s.token)
