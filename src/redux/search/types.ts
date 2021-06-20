export type Filter = {
  from: Date
  to: Date
  page: number
  pageSize: number
}

export type SearchState = Record<string, BucketSearchState>

export type BucketSearchState = {
  filter: Filter
  logs: LogRecord[]
  loading: boolean
}

export enum LogLevel {
  Debug = 'Debug',
  Verbose = 'Verbose',
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error',
  Critical = 'Critical',
  Fatal = 'Fatal',
  Unknown = 'Unknown'
}

export type LogRecord = {
  level: LogLevel
  timestamp: Date
  message: string
  labels: Record<string, string>
}
