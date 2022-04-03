import { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import VotePost from "./components/VotePost";
import Login from "./components/Login";
import VoteDetail from "./components/VoteDetail";
import SignUp from "./components/SignUp";
import Mypage from "./components/Mypage";
import Nickname from "./components/Nickname";
import Password from "./components/Password";
import { useSelector } from "react-redux";

function App() {
  const category = [
    {
      title: "연애",
      id: "1",
    },
    {
      title: "음식",
      id: "2",
    },
    {
      title: "여행",
      id: "3",
    },
    {
      title: "일상",
      id: "4",
    },
    {
      title: "패션",
      id: "5",
    },
    {
      title: "etc",
      id: "6",
    },
  ];

  const [accessToken, setAccessToken] = useState("");
  const isLogin = useSelector((state) => state.isLogin.value);

  const accessTokenHandler = (token) => {
    setAccessToken(token);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLogin ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          <Home category={category} accessToken={accessToken} />
        </Route>
        <Route path="/vote/:voteId">
          <VoteDetail />
        </Route>
        <Route path="/votepost">
          <VotePost accessToken={accessToken} />
        </Route>
        <Route path="/login">
          <Login getAccessToken={accessTokenHandler} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/mypage">
          <Mypage />
        </Route>
        <Route path="/nickname">
          <Nickname />
        </Route>
        <Route path="/password">
          <Password />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
