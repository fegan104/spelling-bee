import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_LETTER:
      return {
        ...state,
        input: [
          ...state.input,
          action.payload
        ]
      }

    case actions.SHUFFLE:
      return {
        ...state,
        outerLetters: shuffle(state.outerLetters)
      }

    case actions.DELETE_LETTER:
      return {
        ...state,
        input: [...state.input.slice(0, -1)]
      }

    case actions.ENTER_WORD:
      return {
        ...state,
        input: [],
        score: computeScore({
          submittedWord: state.input,
          requiredLetter: state.innerLetter,
          currentScore: state.score,
          isWord: action.payload
        }),
      }
    default:
      return state
  }
}

function shuffle(array) {
  for (var i = 1; i < array.length; i++) {
    const n = Math.floor(Math.random() * (array.length - i) + i);
    const temp = array[i - 1]
    array[i - 1] = array[n]
    array[n] = temp
  }
  return [...array]
}

function isPangram(letterArray) {
  return (new Set(letterArray).length) === 7
}

function computeScore({ submittedWord, requiredLetter, currentScore, isWord }) {
  if (!isWord) {
    return currentScore
  } else if (submittedWord.length < 4) {
    return currentScore
  } else if (!submittedWord.includes(requiredLetter)) {
    return currentScore
  } else if (submittedWord.length === 4) {
    return currentScore + 1
  } else {
    const pangramBonus = isPangram(submittedWord) ? 7 : 0;
    return currentScore + submittedWord.length + pangramBonus
  }
}