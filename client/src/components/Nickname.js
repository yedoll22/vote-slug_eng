import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Token from "./Token";

export default function Nickname() {
  const accessToken = useSelector((state) => state.accessToken.value);
  const history = useHistory();
  const location = useLocation();
  const originNickname = location.search.split("=")[1];
  const [nickname, setNickname] = useState(originNickname);
  const [password, setPassword] = useState("");

  //에러메세지
  const [errorMsg, setErrorMsg] = useState("");
  const [validation, setValidation] = useState("");

  const onSubmit = async () => {
    const nicknameRegex = /^[가-힣A-Za-z0-9]{3,12}$/;
    if (!nicknameRegex.test(nickname)) {
      setValidation(
        "닉네임은 한글, 영어, 숫자 최소 3자~12자리까지 설정 가능합니다."
      );
      return;
    }
    await axios
      .patch(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`,
        {
          password: password,
          nickname: nickname,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        history.replace("/mypage");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrorMsg("잘못된 비밀번호입니다．");
          console.log(err.response.message);
        } else if (err.response.status === 403 || err.response.status === 404) {
          history.push("/login");
        }
      });
  };
  return (
    <>
      <div>
        <div className="flex py-[17px] pl-2">
          <img
            onClick={() => {
              history.goBack();
            }}
            className="mr-2"
            src="/images/go-back-arrow.svg"
            alt=""
          />
          <img
            className="w-[131.39px] h-5 mt-[0.5px]"
            src="/images/vslogo-new.png"
            alt="voteslug-logo"
            onClick={() => history.replace("/home")}
          />
        </div>
        <div className="h-1 w-full bg-[#f2f2f2]"></div>
        <div className="px-5 pb-6">
          <div className="pt-6 text-xl font-medium mb-10">닉네임 변경</div>
          <div className="mb-2 flex flex-col">
            <span className="pl-4  text-base font-medium mb-2">닉네임</span>
            <div className="flex relative">
              <input
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="닉네임을 입력하세요."
                className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
              />
              {nickname.length ? (
                <img
                  onClick={() => {
                    setNickname("");
                  }}
                  className="cursor-pointer absolute right-3 top-3.5 z-10"
                  src="/images/delete.svg"
                  alt=""
                />
              ) : null}
            </div>
            <div>{validation}</div>
          </div>

          <div className="mb-4 flex flex-col">
            <span className="pl-4 text-base font-medium mb-2">
              비밀번호 확인
            </span>
            <div className="flex relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="비밀번호를 입력하세요."
                className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
              />
              {password.length ? (
                <img
                  onClick={() => {
                    setPassword("");
                  }}
                  className="cursor-pointer absolute right-3 top-3.5 z-10"
                  src="/images/delete.svg"
                  alt=""
                />
              ) : null}
            </div>
            <div>{errorMsg}</div>
          </div>
          <button
            onClick={onSubmit}
            className="bg-VsGreenLight w-full py-[11px] rounded-3xl font-medium text-xl text-graytypo hover:bg-VsGreen hover:text-[#222222]"
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
}
