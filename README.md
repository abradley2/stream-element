# FRPuccinno

:warning: This is still in alpha development. I would love to get more people
testing this out and finding issues to be stamped out, but I wouldn't recommend
using this on any big projects that require a reliable view layer just yet! :warning:

FRPuccino is a small UI library built on the foundation of [Most.js](https://github.com/mostjs/core)

It's inspired heavily by [Elm](https://elm-lang.org/) and [Cycle.js](https://cycle.js.org/)

Here's a short "counter" example:
```
import { createElement, createApplication } from '@abradley2/frpuccino'

function update (model, addValue) {
  return model + addValue
}

function view () {
  return <div>
    <button onclick={1}>Clicked {value} times!</button>
  </div>
}

createApplication({
  mount: document.getElementById('app'),
  update,
  view,
  init: 0
}).run(0)
```

## Installation

[@most/core](https://github.com/mostjs/core) and a few other associated libraries
are peer dependencies.


`npm install --save @most/core @most/scheduler @most/types @abradley2/frpuccino`


You will also likely find [@most/dom-event](https://github.com/mostjs/dom-event)
and [@most/adaptor](https://github.com/mostjs/adapter) very useful. But only add
them as you find the need. I do recommend checking out the README of each so you
can recognize when that need arises.

## Core Concepts

You do not actually need to be 
[familiar with FRP](https://www.youtube.com/watch?v=Agu6jipKfYw)
to make use of
FRPuccino. Reactive Programming is more the underlying engine of the API than
the API itself. It will be very helpful, however, if you are familiar with the
concepts of
[Streams](https://mostcore.readthedocs.io/en/latest/api.html#stream)
and
[Sinks](https://mostcore.readthedocs.io/en/latest/api.html#sink).

## API and Usage

Only two methods are needed to create basic applications:
`createElement` and `createApplication`

## Function: `createElement`

`createElement` is _FRPuccino's_ "React.createElement" drop-in replacement.

This createElement is unique. It returns an un-mounted DOM element, with
a `Stream` consisting of all bound event handlers.

Here's a short illustrative example
```
/** @jsx createElement */
import { createElement } from '@abradley2/frpuccino'
import { newDefaultScheduler } from '@most/scheduler'

const el = <div>
  <button onclick='Hello there'>Say Hello</button>
  <button onclick='Farewell for now!'>Say Goodbye</button>
</div>

document.body.appendChild(el)

const sink = {
  event: (t, message) => { alert(message) },
  end: () => {},
  error: () => {}
}

el.eventStream.run(sink}, newDefaultScheduler())
```

Our `el` above is a simple `Element` that we can append to our document.
But `createElement` also casts all the registered event handlers on that
`Element` and all it's children to a single `eventStream`
(or `Stream<Action>`) at the top node.

We can run this stream similar to how we'd run any regular
[@most/core stream](https://mostcore.readthedocs.io/en/latest/api.html#running)

Because all our event handlers are bound to strings the type of the event stream
is `Stream<string>`. 

## Function: `createApplication`

`createElement` is cool, but by itself we can't really create complicated 
user interfaces. `createApplication` is a way of "looping" the
`eventStream` returned by `createElement` into an `update` function.

This cycle of `update` -> `event` -> `createElement` -> `update` forms the
basic flow of all applications.

```
createApplication({
  // this is our initial update value!
  init: 0,

  // this is what our user interface looks
  view: (currentState) =>(<div>
    <button onclick={1}>Clicked {currentState} times</button>
  </div>),

  update: (currentState, value) => currentState + value,

  // we need a place to attach our view to the document
  mount: document.getElementById('application')
})
  // to kick off the stream we need to emit an initial value.
  // here we emit "0" because we won't want to increment our state
  // until the user actually clicks the button
  .run(0)
```

## Type: `TaskCreator<Action>`

Our examples up until now have only dealt with event handlers bound
in our view. What if we want to execute and respond to an HTTP request?
What if we want to listen to an event that is scoped outside of our view
(such as `window.onscroll`)? We can use 
[Tasks](https://mostcore.readthedocs.io/en/latest/api.html#tasks) for this.

Tasks are helper functions that allow us to propagate events to `Sinks`

When we call `createApplication` an
internal [Sink](https://mostcore.readthedocs.io/en/latest/api.html#sink)
is created which does a couple things. It subscribes to the `Stream` of
events returned by our `view` and `update` functions, 
and the resulting DOM nodes created by composing `update` with `view`.
The definition is similar to `<Sink<{eventStream: Stream<Action>, view: Element}>>`

A "Task Creator" that creates a 
[Scheduled Task](https://mostcore.readthedocs.io/en/latest/api.html#scheduledtask)
to propagate events to this `Sink` will
look something like this:
```
import { TaskCreator } from '@abradley2/frpuccino'
import { now, propagateEventTask } from '@most/core'
import { asap } from '@most/scheduler'

export function propagateEvent <Action> (action: Action): TaskCreator<Action> {
  const event = { eventStream: now({ action }) }

  return (sink, scheduler) => {
    const task = propagateEventTask(event, sink)

    return asap(task, scheduler)
  }
}
```

## Type: `UpdateResult<Model, Event>`