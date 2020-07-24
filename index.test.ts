import { EventData, isEventData, parseEventData, assertEventData } from '.'

const validEventData: EventData = {
  correlationId: 'dummy-correlation-id',
  data: 'dummy-data',
}

const invalidEventData: unknown = undefined

describe('isEventData', () => {
  it('returns true if the given value is compatible with EventData', () => {
    expect(isEventData(validEventData)).toBe(true)
  })
  it('returns false if the given value is not compatible with EventData', () => {
    expect(isEventData(invalidEventData)).toBe(false)
  })
})

describe('parseEventData', () => {
  it('returns the given value if it is compatible with EventData', () => {
    expect(parseEventData(validEventData)).toBe(validEventData)
  })
  it('throws an Error if the given value is not compatible with EventData', () => {
    expect(() => parseEventData(invalidEventData)).toThrowError()
  })
})

describe('assertEventData', () => {
  it('does nothing if the given value is compatible with EventData', () => {
    assertEventData(validEventData)
  })
  it('throws an Error if the given value is not compatible with EventData', () => {
    expect(() => assertEventData(invalidEventData)).toThrowError()
  })
  describe('Error message', () => {
    it('blames that value is not a type object', () => {
      expect(() => assertEventData(null)).toThrowError(
        'EventData must be a type object',
      )
    })
    it('blames that correlationId is missing', () => {
      expect(() => assertEventData({})).toThrowError(
        'EventData.correlationId must be a type string',
      )
    })
    it('blames that correlationId is not a type string', () => {
      expect(() => assertEventData({ correlationId: 1 })).toThrowError(
        'EventData.correlationId must be a type string',
      )
    })
  })
})
