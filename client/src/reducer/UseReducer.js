export const initialState = {
  signinStatus: false,
  profileUpdateStatus: false,
};

export const reducer = (state, action) => {
  return { ...state, ...action };
};
