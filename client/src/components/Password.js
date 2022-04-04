import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Nickname() {
  const accessToken = useSelector((state) => state.accessToken.value);
  const history = useHistory();
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`,
        {
          password: curPassword,
          newPassword: newPassword,
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
        history.push("/mypage");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setErrMsg("잘못된 비밀번호입니다．");
          console.log(err.response.message);
        } else if (err.response.status === 403 || err.response.status === 404) {
          history.push("/login");
        }
      });
  };

  return (
    <div>
      <div className="flex py-[17px] pl-2">
        <img
          onClick={() => {
            history.goBack();
          }}
          className="mr-2"
          src="/images/go-back-arrow.svg"
          alt=""
        ></img>
        <img src="/images/vslogo.svg" alt="" />
      </div>
      <div className="h-2 w-full bg-[#f2f2f2]"></div>
      <div className="px-5 pb-6">
        <div className="mt-6 text-[#222222] text-xl font-medium mb-10">
          비밀번호 변경
        </div>
        <div className="mb-2 flex flex-col">
          <span className="pl-4 text-[#222222] text-base font-medium mb-2">
            현재 비밀번호
          </span>
          <div className="flex relative">
            <input
              type="password"
              value={curPassword}
              onChange={(e) => {
                setCurPassword(e.target.value);
              }}
              placeholder="현재 비밀번호를 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            {curPassword.length ? (
              <img
                onClick={() => {
                  setCurPassword("");
                }}
                className="cursor-pointer absolute right-3 top-3.5 z-10"
                src="/images/delete.svg"
                alt=""
              />
            ) : null}
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <span className="pl-4 text-[#222222] text-base font-medium mb-2">
            새 비밀번호
          </span>
          <div className="flex relative">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="새 비밀번호를 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            {newPassword.length ? (
              <img
                onClick={() => {
                  setNewPassword("");
                }}
                className="cursor-pointer absolute right-3 top-3.5 z-10"
                src="/images/delete.svg"
                alt=""
              />
            ) : null}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <span className="pl-4 text-[#222222] text-base font-medium mb-2">
            새 비밀번호 확인
          </span>
          <div className="flex relative">
            <input
              type="password"
              value={newConfirmPassword}
              onChange={(e) => {
                setNewConfirmPassword(e.target.value);
              }}
              placeholder="새 비밀번호를 한번 더 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            {newConfirmPassword ? (
              <img
                onClick={() => {
                  setNewConfirmPassword("");
                }}
                className="cursor-pointer absolute right-3 top-3.5 z-10"
                src="/images/delete.svg"
                alt=""
              />
            ) : null}
          </div>
          {newPassword !== newConfirmPassword && (
            <div className="text-VsRed">새 비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <button
          onClick={onSubmit}
          className="bg-VsGreenLight w-full py-[11px] rounded-3xl font-medium text-xl text-graytypo hover:bg-VsGreen hover:text-[#222222]"
        >
          저장
        </button>
      </div>
    </div>
  );
}
