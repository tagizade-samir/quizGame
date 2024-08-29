import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { difficultyOptions, noOfQuestionsOptions, timeOptions, typeOptions } from "../../constants"

const initialState = {
  config: {
    noOfQuestions: noOfQuestionsOptions,
    time: timeOptions,
    difficulty: difficultyOptions,
    type: typeOptions,
    categories: [],
  },
  selectedConfig: {
    noOfQuestions: null,
    time: null,
    difficulty: null,
    type: null,
    categories: null,
  }
}

export const selectConfig = (state) => state.settings.config
export const selectSelectedConfig = (state) => state.settings.selectedConfig

export const fetchCategories = createAsyncThunk(
  'fetchCategories',
  async () => {
    const result = await fetch('https://opentdb.com/api_category.php')
    const data = await result.json()

    if (data && 'trivia_categories' in data) {
      return data.trivia_categories
    }

    return []
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.selectedConfig = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.config.categories = [{id: -1, name: 'Any'}, ...action.payload]
    })
  }
})

export const {setConfig} = settingsSlice.actions

export const settingsReducer = settingsSlice.reducer
