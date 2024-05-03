import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './reducers/themeSlice'
import treeDataSlice from './reducers/treeDataSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      themeSlice,
      treeDataSlice
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']