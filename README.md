# @suin/event-data

A simple event data representation for TypeScript.

This component provides a very simple reusable interface that represents an event.

The interface was designed for the use case that represents event payloads of messaging system like Google Cloud Pub/Sub.

## Features

- Abstract event data type `EventData`
- Type guard function
- Validation function
- Assertion function

## Installation

```bash
yarn add @suin/event-data
# or
npm install @suin/event-data
```

## Usages

### Declaring the `EventData` value

The basic way to declare the event data is to annotate value with type `EventData`:

```typescript
import { EventData } from '@suin/event-data'

const event: EventData = {
  correlationId: '68a5e0dd-34a0-47fa-94d4-8fa2162301e3',
  data: {
    foo: 1,
    bar: 2,
  },
}
```

However, this `data` property becomes type `unknown`. If you would like to give type information to `data` property, it would be useful to use `newEventData` function, since this infers the type:

```typescript
import { newEventData } from '@suin/event-data'

const event = newEventData({
  correlationId: '68a5e0dd-34a0-47fa-94d4-8fa2162301e3',
  data: {
    foo: 1,
    bar: 2,
  },
})

const foo: number = event.data.foo
```

### Using the type guard function

```typescript
import { isEventData } from '@suin/event-data'

const event: unknown = {
  /* ... */
}

if (isEventData(event)) {
  console.log(event.correlationId)
  console.log(event.data) // NOTICE: the type is unknown
} else {
  console.log('The value is incompatible with EventData')
}
```

### Using the validation function

```typescript
import { parseEventData } from '@suin/event-data'

try {
  const event = parseEventData(JSON.parse('{}'))
  console.log('The JSON value is compatible with EventData', event)
} catch (error) {
  console.log(error)
}
```

### Using the assertion function

```typescript
import { assertEventData } from '@suin/event-data'

try {
  const event: unknown = JSON.parse('{}')
  assertEventData(event)
  console.log('The JSON value is compatible with EventData', event)
} catch (error) {
  console.log(error)
}
```

## API Reference

https://suin.github.io/event-data/
