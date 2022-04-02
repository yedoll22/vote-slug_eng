import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import VotePost from "./components/VotePost";
import Login from "./components/Login";
import VoteDetail from "./components/VoteDetail";
import SignUp from "./components/SignUp";
import Mypage from "./components/Mypage";
import Nickname from "./components/Nickname";
import Password from "./components/Password";
import axios from "axios";

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
  const dummyData = [
    {
      id: 1,
      voteTite: "코로나 끝나면 당장 어디로",
      voteOption1: "푸켓",
      voteOption2: "런던",
      voteOption1Count: 131,
      voteOption2Count: 100,
      nickname: "peter",
      category: "여행",
      createdAt: 2000,
    },
    {
      id: 2,
      voteTite: "오늘 점심?",
      voteOption1: "샌드위치",
      voteOption2: "쌀국수",
      voteOption1Count: 131,
      voteOption2Count: 100,
      nickname: "wanda",
      category: "일상",
      createdAt: 2002,
    },
  ];

  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const accessTokenHandler = (token) => {
    setAccessToken(token);
  };

  const loginHandler = () => {
    setIsLogin(true);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLogin ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/home">
          <Home
            category={category}
            dummyData={dummyData}
            accessToken={accessToken}
          />
        </Route>
        <Route path="/vote/:voteId">
          <VoteDetail />
        </Route>
        <Route path="/votepost">
          <VotePost accessToken={accessToken} />
        </Route>
        <Route path="/login">
          <Login
            getAccessToken={accessTokenHandler}
            loginHandler={loginHandler}
          />
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
