import { isObject } from '@suin/is-object'

export type EventData<T = unknown> = {
  correlationId: string
  data: T
}

/**
 * Returns new EventData.
 */
export const newEventData = <T>(eventData: EventData<T>): EventData<T> =>
  eventData

/**
 * Checks if the given value is compatible with EventData.
 */
export const isEventData = (value: unknown): value is EventData => {
  try {
    assertEventData(value)
    return true
  } catch {
    return false
  }
}

/**
 * Returns the given value as EventData if it is valid, otherwise throws an
 * Error.
 * @throws {Error}
 */
export const parseEventData = (value: unknown): EventData => {
  assertEventData(value)
  return value
}

/**
 * Asserts that the given value is compatible with EventData, otherwise throws
 * ane Error.
 * @throws {Error}
 */
export function assertEventData(value: unknown): asserts value is EventData {
  if (!isObject<EventData>(value)) {
    throw new Error('EventData must be a type object')
  }
  if (typeof value.correlationId !== 'string') {
    throw new Error('EventData.correlationId must be a type string')
  }
}
