import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "./slices/settings";
import { gameReducer } from "./slices/game";

const storeConfig = {
  reducer: {
    settings: settingsReducer,
    game: gameReducer
  }
}

export const store = configureStore(storeConfig)
