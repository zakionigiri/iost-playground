import {
  configureStore,
  getDefaultMiddleware,
  PayloadAction,
  Middleware
} from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import { createLogger } from 'redux-logger'
import { rootReducer, epics, AllActions } from './features'

const epicMiddleware = createEpicMiddleware<AllActions, AllActions, RootState>()

const middlewares: Middleware[] = [epicMiddleware]

if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware = createLogger({
    diff: true,
    collapsed: true
  })
  middlewares.push(loggerMiddleware)
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares]
})

epicMiddleware.run(epics)

export type RootState = ReturnType<typeof rootReducer>
export default store
