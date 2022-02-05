import { Redirect } from "react-router-dom";
import ListContainer from "../containers/ListContainer";
import useToken from "../hooks/useToken";

export default function Home() {
  //로그인이 되어있는지 확인
  const token = useToken();

  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <ListContainer />;
}
