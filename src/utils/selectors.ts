import { RootState } from '../redux/types'

export function paramSelector<P, S = RootState>() {
  return (_state: S, param: P) => param
}
