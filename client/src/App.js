import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login"
import Mypage from "./components/Mypage"
import SignUp from "./components/SignUp";

function App() {
  //리덕스　전역관리
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessTocken] = useState('');

  const accessTokenHandler = (token) => {
    setAccessTocken(token);
  }

  const isLoginHandler = () => {
    setIsLogin(true);
  }

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path='/'>
          { isLogin ? <Redirect to = '/home' /> : <Redirect to = '/login'/> }
          </Route>
          <Route path="/login">
           <Login getAccessToken = {accessTokenHandler} loginHandler = {isLoginHandler} />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route path="/signup">
           <SignUp />
          </Route>
        </Switch>
    </BrowserRouter>  
  );
}

export default App;
