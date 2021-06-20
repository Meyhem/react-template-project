import { AxiosResponse } from 'axios'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type SetDifference<A, B> = A extends B ? never : A
export type SetComplement<A, A1 extends A> = SetDifference<A, A1>
export type Subtract<T extends T1, T1 extends object> = Pick<T, SetComplement<keyof T, keyof T1>>

export type Dictionary<T> = {
  [Key: string]: T
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T[P] extends Dictionary<infer V>
    ? Dictionary<V>
    : DeepPartial<T[P]>
}

export type Error = {
  message?: string
  stack?: string
  isAxiosError?: boolean
}

export type Intersection<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
>

export type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>

export type Assign<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T> & Diff<U, T>> = Pick<
  I,
  keyof I
>

export interface Callable<R> {
  (...args: any[]): R
}

export type GenericReturnType<R, X> = X extends Callable<R> ? R : never

export type ApiError = { errorMessage: string; genericDescription: string; errorCode: string; stack: string }
export type ApiResponse<T> = { data: T; error: ApiError }

export type AxiosApiResponse<T> = AxiosResponse<ApiResponse<T>>
