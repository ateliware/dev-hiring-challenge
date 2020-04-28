export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING'
export const IDLE = 'IDLE'

export const startLoading = () => {
  return { type: START_LOADING }
}

export const endLoading = () => {
  return { type: END_LOADING }
}

export const idleLoading = () => {
  return { type: IDLE }
}
