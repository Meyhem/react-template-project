import { createSelector } from 'reselect'
import { RootState } from '../types'
import { LoadingState } from './types'

export const createLoadingSelector = <SS extends LoadingState>(selectState: (root: RootState) => SS) =>
  createSelector(selectState, s => s.loading)
