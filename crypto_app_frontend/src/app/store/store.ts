import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cryptoReducer from './slices/cryptoSlice';
import { saveState, loadState } from '../utils/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    crypto: store.getState().crypto,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
