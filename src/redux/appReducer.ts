export enum Wallet {
  KAIKAS = 'KAIKAS',
  KLIP = 'KLIP',
}

const initialState = {
  jwt: '',
  wallet: Wallet.KAIKAS,
};
// action type
export const appActions = {
  LOGIN: 'app/LOGIN',
  LOGOUT: 'app/LOGOUT',
};

type AppAction = keyof typeof appActions;

// action function
export const appLoginAction = ({jwt, wallet}: typeof initialState) => ({
  type: appActions.LOGIN,
  wallet,
  jwt,
});
export const appLogoutAction = () => ({type: appActions.LOGOUT});

const f = (action: {type: string}, func: Function) => func(action);

export const appReducer = (state = initialState, action: {type: AppAction}) => {
  switch (action.type) {
    case appActions.LOGIN:
      return f(action, ({jwt, wallet}: typeof initialState) => {
        return {
          jwt,
          wallet,
        };
      });
    case appActions.LOGOUT:
      return f(action, () => {
        return initialState;
      });
    default: {
      return state;
    }
  }
};
