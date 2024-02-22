# state-machine-lib

A ReactJS hook to manage state machine

## How to use it?

You can use the project in this way:

### Install
```bash
# with npm
npm install state-machine-lib
```

### Usage

- Import the package in your app:
```js
import { useStateMachine } from "state-machine-lib";
```

- Get the state machine and transition from the hook:
```js
const { transition, machineState } = useStateMachine(initialState, stateMachineConfiguration);
```


Github repo: [state-machine-implementation](https://github.com/densorokin/state-machine-implementation)

Implementation: [Web page example](https://densorokin.github.io/state-machine-implementation/)
