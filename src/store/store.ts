import { configureStore } from "@reduxjs/toolkit"
import { mixoApi } from "@/services/apiSlice"

export const store = configureStore({
  reducer: {
    [mixoApi.reducerPath]: mixoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mixoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
