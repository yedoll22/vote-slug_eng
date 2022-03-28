import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ loginHandler, getAccessToken }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const inputHandler = (e) => {
    setUserInfo({ [e.target.name]: e.target.value });
  };

  const loginRequestHandler = async () => {
    const { email, password } = userInfo;
    await axios
      .post(
        "",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        loginHandler();
        getAccessToken(res.accessToken);
      })
      .catch();
  };

  return (
    <div>
      <h1>login</h1>
      <div>
        <form className="p-1 w-full max-w-xl">
          <div className="flex items-center border-b border-teal-500 py-2">
            <div className="flex-shrink-0 bg-teal-500 border-teal-500 text-sm border-4 text-white py-1 px-2 rounded">
              e-mail
            </div>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="이메일을　입력해주세요"
              name="email"
              value={userInfo.email}
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </form>
      </div>
      <div>
        <form className="p-1 w-full max-w-xl">
          <div className="flex items-center border-b border-teal-500 py-2">
            <div className="flex-shrink-0 bg-teal-500 border-teal-500 text-sm border-4 text-white py-1 px-2 rounded">
              password
            </div>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="비밀번호을　입력해주세요"
              name="password"
              value={userInfo.password}
              onChange={(e) => {
                inputHandler(e);
              }}
            />
          </div>
        </form>
      </div>
      <div>
        <button onClick={loginRequestHandler}>Log in</button>
      </div>
      <div>
        <button>Tour</button>
      </div>
      <div>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
