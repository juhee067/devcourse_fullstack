import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer/reducer';

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const logger = useSelector((state: RootState) => state.logger);

export default store;
