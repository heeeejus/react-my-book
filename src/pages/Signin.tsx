import { Redirect } from "react-router-dom";
import SigninContainer from "../containers/SigninContainer";
import useToken from "../hooks/useToken";

export default function Signin() {
  const token = useToken();

  if (token !== null) {
    return <Redirect to="/" />;
  }
  //signin 컨테이너에서 리덕스와 연결해 하위 컴포넌트로
  return <SigninContainer />;
}
