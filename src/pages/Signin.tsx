import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
import { RootState } from "../types";

export default function Signin() {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  if (token !== null) {
    return <Redirect to="/" />;
  }
  //signin 컨테이너에서 리덕스와 연결해 하위 컴포넌트로
  return <SigninContainer />;
}
