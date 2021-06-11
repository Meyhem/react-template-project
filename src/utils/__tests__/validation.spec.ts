import { FieldState, FieldValidator } from 'final-form'
import _ from 'lodash'
import {
  required,
  composeValidators,
  createFormValidator,
  length,
  maxLength,
  minLength,
  error,
  requiredIf,
  regex
} from '../validation'

describe('required', () => {
  test('should fail on nil value', () => {
    expect(required()(undefined, {})).toEqual(error('Required'))
    expect(required()(null, {})).toEqual(error('Required'))
    expect(required()('', {})).toEqual(error('Required'))
  })

  test('should pass on present value', () => {
    expect(required()(123, {})).toBeUndefined()
    expect(required()(0, {})).toBeUndefined()
  })
})

describe('requiredIf', () => {
  test('should fail on nil value with condition true', () => {
    expect(requiredIf(_.constant(true))(undefined, {})).toEqual(error('Required'))
    expect(requiredIf(_.constant(true))(null, {})).toEqual(error('Required'))
    expect(requiredIf(_.constant(true))('', {})).toEqual(error('Required'))
  })

  test('should pass on present value or condition false', () => {
    expect(requiredIf(_.constant(true))(123, {})).toBeUndefined()
    expect(requiredIf(_.constant(true))(0, {})).toBeUndefined()

    expect(requiredIf(_.constant(false))(null, {})).toBeUndefined()
    expect(requiredIf(_.constant(false))(undefined, {})).toBeUndefined()
  })
})

describe('minLength', () => {
  test('should fail shorter values', () => {
    expect(minLength(3)('', {})).toEqual(error('MinLength', { min: 3 }))
    expect(minLength(3)('12', {})).toEqual(error('MinLength', { min: 3 }))
    expect(minLength(3)(0, {})).toEqual(error('MinLength', { min: 3 }))
  })

  test('should pass longer values', () => {
    expect(minLength(3)('123', {})).toBeUndefined()
    expect(minLength(3)(123, {})).toBeUndefined()
    expect(minLength(3)('Wayyy longer than necessary', {})).toBeUndefined()
  })
})

describe('maxLength', () => {
  test('should fail longer values', () => {
    expect(maxLength(3)('1234', {})).toEqual(error('MaxLength', { max: 3 }))
    expect(maxLength(3)(1234, {})).toEqual(error('MaxLength', { max: 3 }))
  })

  test('should pass on shorter values', () => {
    expect(maxLength(3)('', {})).toBeUndefined()
    expect(maxLength(3)(12, {})).toBeUndefined()
    expect(maxLength(3)('123', {})).toBeUndefined()
  })
})

describe('length', () => {
  test('should fail on shorter value', () => {
    expect(length({ min: 3 })('12', {})).toEqual(error('MinLength', { min: 3 }))
    expect(length({ min: 3, max: 123 })('12', {})).toEqual(error('MinLength', { min: 3 }))
  })
  test('should fail on longer value', () => {
    expect(length({ max: 3 })('1234', {})).toEqual(error('MaxLength', { max: 3 }))
    expect(length({ min: 0, max: 3 })('1234', {})).toEqual(error('MaxLength', { max: 3 }))
  })
  test('should pass on valid length', () => {
    expect(length({ min: 0, max: 3 })('', {})).toBeUndefined()
    expect(length({ min: 0, max: 3 })('123', {})).toBeUndefined()
    expect(length({ min: 0, max: 0 })('', {})).toBeUndefined()
    expect(length({ min: 3, max: 3 })('123', {})).toBeUndefined()
  })
})

describe('composeValidators', () => {
  test('should compose validators', () => {
    const v = composeValidators(required(), minLength(3))
    expect(v('123', {})).toBeUndefined()
    expect(v('12', {})).toEqual(error('MinLength', { min: 3 }))
    expect(v(null, {})).toEqual(error('Required'))
  })

  test('should create noop validator when no provided', () => {
    const v = composeValidators()
    expect(v('', {})).toBeUndefined()
    expect(v(123456789, {})).toBeUndefined()
  })

  test('should be recursively composable', () => {
    const v = composeValidators(composeValidators(minLength(2), maxLength(4)), composeValidators(required()))
    expect(v('123', {})).toBeUndefined()
    expect(v('1', {})).toEqual(error('MinLength', { min: 2 }))
    expect(v('12345', {})).toEqual(error('MaxLength', { max: 4 }))
    expect(v(null, {})).toEqual(error('Required'))
  })

  test('should drill down allValues', () => {
    const trap = jest.fn()
    const fakeValidator: FieldValidator<any> = (v: any, allValues: any) => trap(allValues)

    const v = composeValidators(fakeValidator)

    v('', { drilledValues: true }, {})

    expect(trap).toHaveBeenCalledWith({ drilledValues: true })
  })

  test('should drill down meta', () => {
    const trap = jest.fn()
    const fakeValidator: FieldValidator<any> = (v: any, allValues: any, meta?: FieldState<any>) => trap(meta)

    const v = composeValidators(fakeValidator)

    v('', {}, { drilledMeta: true })

    expect(trap).toHaveBeenCalledWith({ drilledMeta: true })
  })
})

describe('createFormValidator', () => {
  const v = createFormValidator({
    prop1: [required()],
    prop2: [composeValidators(required(), minLength(3))],
    prop3: [required(), minLength(3)]
  })

  test('should validate object', () => {
    expect(v()({ prop1: '', prop2: '123', prop3: '123' })).toEqual({
      prop1: error('Required')
    })
  })

  test('should validate single invalid property', () => {
    expect(v()({ prop1: undefined, prop2: '123', prop3: '123' })).toEqual({
      prop1: error('Required')
    })
  })

  test('should validate multiple invalid properties', () => {
    expect(v()({ prop1: undefined, prop2: undefined, prop3: '123' })).toEqual({
      prop1: error('Required'),
      prop2: error('Required')
    })
  })

  test('should treat array of validators as composed validators', () => {
    const result = v()({ prop1: '', prop2: '1', prop3: '1' })

    expect(result).toBeDefined()
    expect(result?.prop2).toEqual(result?.prop3)
  })

  test('should ignore non-validated properties', () => {
    const result = v()({ prop1: '123', prop2: '123', prop3: '123', blackPassenger: 'hello' } as any)

    expect(result).toBeUndefined()
  })

  test('should handle property Nils', () => {
    expect(() => createFormValidator({ prop1: null as any })()({ prop1: {} })).not.toThrow()
    expect(() => createFormValidator({ prop1: undefined })()({ prop1: {} })).not.toThrow()
  })
})

describe('regex validator', () => {
  test('regex', () => {
    const v = regex(/^(.+)@(.+).(.+)$/i, 'not email')

    expect(v('abc@d.e', {})).toBeUndefined()
    expect(v('AAAbcdefg1', {})).toEqual(error('Regex', { message: 'not email' }))
    expect(v('', {})).toEqual(error('Required'))
    expect(v(undefined, {})).toEqual(error('Required'))
  })
})
