import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
  list: [],
  loading: false,
  currentQuestion: 0,
  answers: []
}

export const selectQuestions = (state) => state.game.list
export const selectIsQuestionsLoading = (state) => state.game.loading
export const selectCurrentQuestion = (state) => state.game.currentQuestion
export const selectAnswers = (state) => state.game.answers
export const selectAmountOfQuestions = (state) => state.game.list.length

export const fetchQuestions = createAsyncThunk(
  'fetchQuestions',
  async ({noOfQuestions, type, difficulty, categories}) => {
    let url = `https://opentdb.com/api.php?amount=${noOfQuestions}`

    if (type !== '-1') {
      url = url.concat(`&type=${type}`)
    }

    if (difficulty !== '-1') {
      url = url.concat(`&difficulty=${difficulty}`)
    }

    if (categories !== -1) {
      url = url.concat(`&category=${categories}`)
    }

    const result = await fetch(url)
    const data = await result.json()

    if (data && 'results' in data) {
      return data.results
    }

    return []
  }
)

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    answer: (state, action) => {
      state.currentQuestion = state.currentQuestion + 1
      state.answers.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
    })
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = false
    })
  }
})

export const {answer} = gameSlice.actions

export const gameReducer = gameSlice.reducer
