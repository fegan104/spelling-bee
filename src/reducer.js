import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_LETTER:
      return {
        ...state,
        activeInput: [
          ...state.activeInput,
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
        activeInput: [...state.activeInput.slice(0, -1)]
      }

    case actions.ENTER_WORD:
      const { nextScore, error } = computeScore({
        submittedWord: state.activeInput.join(""),
        requiredLetter: state.innerLetter,
        previousWords: state.submittedWords,
        currentScore: state.score,
        isWord: action.payload
      })

      return {
        ...state,
        activeInput: [],
        submittedWords: error ? state.submittedWords : [...new Set([...state.submittedWords, state.activeInput.join("")])],
        score: nextScore,
        error
      }

    case actions.SET_LETTERS:
      return {
        ...state,
        innerLetter: action.payload.innerLetter,
        outerLetters: action.payload.outerLetters,
      }

    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: ""
      }
    default:
      return state
  }
}

function shuffle(array) {
  var i = array.length
  while (i > 1) {
    i = i - 1
    const j = Math.floor(Math.random() * i) // 0 <= j < i
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return [...array]
}

function isPangram(letterArray) {
  return (new Set(letterArray).length) === 7
}

function computeScore({ submittedWord, previousWords, requiredLetter, currentScore, isWord }) {
  if (submittedWord.length < 4) {
    return {
      nextScore: currentScore,
      error: "Too short"
    }
  } else if (!submittedWord.includes(requiredLetter)) {
    return {
      nextScore: currentScore,
      error: "Missing center letter"
    }
  } else if (!isWord) {
    return {
      nextScore: currentScore,
      error: "Not in word list"
    }
  } else if (previousWords.includes(submittedWord)) {
    return {
      nextScore: currentScore,
      error: "Already found"
    }
  } else if (submittedWord.length < 4) {
    return {
      nextScore: currentScore,
      error: "Too short"
    }
  } else if (submittedWord.length === 4) {
    return {
      nextScore: currentScore + 1
    }
  } else {
    const pangramBonus = isPangram(submittedWord) ? 7 : 0;
    return {
      nextScore: (currentScore + submittedWord.length + pangramBonus)
    }
  }
}