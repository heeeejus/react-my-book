import React from "react";
import { Redirect } from "react-router-dom";
import AddContainer from "../containers/AddContainer";
import useToken from "../hooks/useToken";

export default function add() {
  //로그인 되어있는지 확인
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = useToken();

  if (token === null) {
    return <Redirect to="signin" />;
  }

  return <AddContainer />;
}
