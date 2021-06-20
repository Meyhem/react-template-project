import { ActionType, createAction } from 'typesafe-actions'
import { Filter, LogRecord } from './types'

type BucketScoped<T = {}> = T & { bucket: string }

export const SearchActions = {
  resetFilter: createAction('SEARCH/RESET_FILTER')<BucketScoped>(),
  setFilter: createAction('SEARCH/SET_FILTER')<
    BucketScoped<{
      filter: Filter
    }>
  >(),
  load: createAction('SEARCH/LOAD')<BucketScoped>(),
  addLogs: createAction('SEARCH/SET_LOGS')<BucketScoped<{ logs: LogRecord[] }>>()
}

export type SearchActions = ActionType<typeof SearchActions>
