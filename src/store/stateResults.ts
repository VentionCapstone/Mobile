import { StateType } from 'src/types';

export const onPending = (state: StateType) => {
  state.pending = true;
  state.error = null;

  setTimeout(() => {
    state.pending = false;
  }, 5000);
  state.error = {
    error: 'Internal Server Error!',
    message: 'Something is wrong! Please, try again!',
    statusCode: 500,
  };
};

export const onFulfilled = (state: StateType, action: { payload: any }) => {
  state.pending = false;
  state.result = action.payload;
  state.error = null;
};

export const onError = (state: StateType, action: { payload: any }) => {
  state.pending = false;
  state.error = action.payload.error;
};
