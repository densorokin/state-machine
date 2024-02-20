export const INITIAL_STATE = 'initial';

export const Person = {
  initial: {
    start: 'personal'
  },
  personal: {
    next: 'occupation'
  },
  occupation: {
    back: 'personal',
    education: 'education',
    work: 'work'
  },
  education: {
    back: 'occupation',
    send: 'loading'
  },
  work: {
    back: 'occupation',
    send: 'loading'
  },
  loading: {
    success: 'success'
  },
  success: {
    reset: 'initial'
  }
};
