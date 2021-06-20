import { RootState } from '../types'
import { bucketInitialState } from './reducer'

const selectState = (state: RootState) => state.search

export const selectBucket = (state: RootState, bucket: string) => selectState(state)[bucket]

export const selectFilter = (state: RootState, bucket: string) =>
  selectBucket(state, bucket)?.filter ?? bucketInitialState.filter

export const selectLogs = (state: RootState, bucket: string) => selectBucket(state, bucket)?.logs ?? []
