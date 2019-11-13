
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CANDIDATES':
      return [...action.candidates]
    default:
      return [...state]
  }
}

export const initializeCandidates = () => {
  return async dispatch => {
    const candidates = await candidateService.getAll()
    console.log(candidates)
  }
}

export default reducer