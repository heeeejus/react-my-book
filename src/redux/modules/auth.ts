import { push } from "connected-react-router";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";

//인증 관리

const initialState: AuthState = {
  //초기값 세팅
  token: null,
  loading: false,
  error: null,
};

//prefix 설정
const prefix = "my-books/auth";

//create-actions를 통해 액션 생성 함수 만들기
//prefix를 통해 my-books/auth/를 달수 있게함
export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

//reducer 만들기
const reducer = handleActions<AuthState, string>(
  {
    //액션의 타입을 바탕으로 리듀서 로직이 만들어짐
    //기존의 state를 받아서 loadgin 등 바뀜
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    //토큰을 받아서 넣어야해서 state, action을 받아 token을 action.payload로
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    // localstorage
    TokenService.set(token);
    yield put(success(token));
    console.log(token);
    //push->connected-react-router
    yield put(push("/")); //로그인이 성공적으로 이루어 지면 root페이지로 이동할 수 있도록
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    // localstorage
    TokenService.set(token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
