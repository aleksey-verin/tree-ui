import { configureStore } from '@reduxjs/toolkit'
import treeDataSlice from './reducers/treeDataSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      treeDataSlice
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']