import { FieldValidator } from 'final-form'
import _ from 'lodash'

import { Dictionary } from '../utils/types'

export interface LocalizedMessage {
  translationKey: string
  interpolation?: Record<string, React.ReactText>
  defaultMessage?: string
}

export const createFormValidator =
  <T extends Dictionary<any>>(validators: Partial<Record<keyof T, FieldValidator<any>[]>>) =>
  (props?: any) =>
  (values: T) => {
    const errors = _.reduce(
      validators,
      (acc, _, key) => {
        if (!validators[key]) return acc
        // @ts-ignore
        const error = composeValidators(...validators[key])(values[key], values, { data: props })
        if (error) acc[key] = error
        return acc
      },
      {} as Dictionary<LocalizedMessage | undefined>
    )
    return _.isEmpty(errors) ? undefined : errors
  }

export const composeValidators =
  (...validators: FieldValidator<any>[]) =>
  (value: any, allValues: Dictionary<any> | null, meta?: any) =>
    _.reduce(validators, (error, validator) => error || validator(value, allValues || {}, meta), undefined)

export function error(translationKey: string, interpolation?: any, defaultMessage?: string): LocalizedMessage {
  return {
    translationKey,
    interpolation,
    defaultMessage
  }
}

export const required = (): FieldValidator<any> => value => {
  if (_.isString(value) && _.isEmpty(value)) return error('Required')
  return _.isNil(value) ? error('Required') : undefined
}

export const requiredIf =
  (condition: (allValues: any) => boolean): FieldValidator<any> =>
  (value, allValues) => {
    if (_.isString(value) && _.isEmpty(value) && condition(allValues)) return error('Required')
    return _.isNil(value) && condition(allValues) ? error('Required') : undefined
  }

export const isTrue = (msg: LocalizedMessage) => (v: boolean) => v === true ? undefined : msg

export const minLength =
  <T = any>(min: number): FieldValidator<T> =>
  value =>
    _.size(String(value)) < min ? error('MinLength', { min }) : undefined

export const maxLength =
  <T = any>(max: number): FieldValidator<T> =>
  value =>
    _.size(String(value)) > max ? error('MaxLength', { max }) : undefined

export const length =
  <T = any>({ min, max }: { min?: number; max?: number }): FieldValidator<T> =>
  (value, values, meta) => {
    let res = undefined
    if (!_.isUndefined(min)) res = minLength(min)(value, values, meta)
    if (res) return res
    if (!_.isUndefined(max)) res = maxLength(max)(value, values, meta)
    return res
  }

export const regex =
  <T = any>(regex: RegExp, message: string): FieldValidator<T> =>
  (value, values, meta) => {
    const empty = required()(value, values, meta)
    if (empty) return empty

    if (!_.isString(value) || !regex.test(value)) {
      return error('Regex', { message })
    }
    return undefined
  }

export const regexOrEmpty =
  <T = any>(regex: RegExp, message: string): FieldValidator<T> =>
  value => {
    if (!value) return undefined
    if (!_.isString(value) || !regex.test(value)) {
      return error('Regex', { message })
    }
    return undefined
  }
