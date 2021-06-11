import { makeRootReducer } from './rootReducer'

export type RootState = ReturnType<ReturnType<typeof makeRootReducer>>
