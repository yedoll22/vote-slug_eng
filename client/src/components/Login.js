import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login({ loginHandler, getAccessToken }) {
  // 이메일, 비밀번호 확인
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  // 오류 메시지 상태 저장
  const [emailMessage, setEmailMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);

  const emailHandler = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    if (!emailRegex.test(userInfo.email)) {
      setEmailMessage("이메일 형식을 확인해주세요");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setIsEmail(true);
    }
  };

  const passwordHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const loginRequestHandler = async () => {
    const { email, password } = userInfo;
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        loginHandler();
        getAccessToken(res.data.accessToken);
        history.push("/");
      })
      .catch((err) => {
        if (err.response.data.message === "wrong email") {
          setLoginErrorMessage("존재하지 않는 이메일입니다.");
        } else if (err.response.data.message === "wrong password") {
          setLoginErrorMessage("비밀번호가 틀렸습니다.");
        } else {
          console.log("Error", err.message);
        }
      });
  };

  return (
    <div className="pt-10 pb-[17px]">
      <div className="w-full h-[120px] bg-[#8BCDFE] mb-10"></div>
      <div className="px-5 mb-4">
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="pl-4 mb-2 text-base font-medium">이메일</span>
          <input
            onChange={emailHandler}
            value={userInfo.email}
            name="email"
            type="text"
            className="w-full h-[48px] rounded-[8px] border border-[#d3d3d3] pl-4 text-sm font-normal"
            placeholder="이메일을 입력하세요."
          ></input>
          {userInfo.email.length > 0 && (
            <span
              className={
                isEmail ? "text-sm text-indigo-500" : "text-sm text-red-400"
              }
            >
              {emailMessage}
            </span>
          )}
        </div>
        <div className="flex flex-col pb-[18px] mb-4">
          <span className="pl-4 mb-2 text-base font-medium">비밀번호</span>
          <input
            onChange={passwordHandler}
            value={userInfo.password}
            name="password"
            type="password"
            className="w-full h-[48px] rounded-[8px] border border-[#d3d3d3] pl-4 text-sm font-normal"
            placeholder="비밀번호를　입력하세요."
          ></input>
        </div>

        <button
          onClick={loginRequestHandler}
          className="bg-VsGreen rounded-[24px] w-full h-11 text-xl font-medium"
        >
          로그인
        </button>
        <div className="text-sm text-red-400">{loginErrorMessage}</div>
      </div>
      <div className="flex justify-center py-[11px] mb-[58px]">
        <button className="text-sm text-[#7A7A7A] font-medium">
          로그인 없이 둘러보기
        </button>
      </div>
      <div className="flex justify-center py-[11px]">
        <span className="text-[#7a7a7a] font-normal text-sm">
          보트슬러그 계정이 없으신가요？
        </span>
        <button className="text-[#7CE0AE] font-medium text-sm">가입하기</button>
      </div>
    </div>
  );
}
