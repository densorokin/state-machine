export const INITIAL_STATE = 'step00';

export const stateMachineMock = {
  step00: {
    actions: {
      onInAction: jest.fn(),
      onOutAction: jest.fn()
    },
    transitions: {
      step01: {
        target: 'step01',
        action: jest.fn()
      }
    }
  },
  step01: {
    transitions: {
      step02: {
        target: 'step02',
        action: jest.fn()
      }
    }
  },
  step02: {
    transitions: {
      step01: {
        target: 'step01',
        action: jest.fn()
      },
      step03: {
        target: 'step03',
        action: jest.fn()
      },
      step04: {
        target: 'step04',
        action: jest.fn()
      }
    }
  },
  step03: {
    transitions: {
      step02: {
        target: 'step02'
      },
      step05: {
        target: 'step05',
        action: jest.fn()
      }
    }
  },
  step04: {
    transitions: {
      step02: {
        target: 'step02',
        action: jest.fn()
      },
      step05: {
        target: 'step05',
        action: jest.fn()
      }
    }
  },
  step05: {
    transitions: {
      step06: {
        target: 'step06',
        action: jest.fn()
      }
    }
  },
  step06: {
    transitions: {
      step00: {
        target: 'step00',
        action: jest.fn()
      }
    }
  }
};
