import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nickname() {
  //비밀번호변경，닉네임변경
  // const modifyUserPassword = async () => {
  //   await axios
  //     .patch(
  //       `${process.env.SERVER_EC2_ENDPOINT}/user`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${props.accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       },
  //       {
  //         //유효성검사
  //         password: password,
  //         newpassword: newpassword,
  //       }
  //     )
  //     .then((res) => {});
  // };

  return (
    <div>
      <div className="flex py-[17px] pl-2">
        <img className="mr-2" src="/images/go-back-arrow.svg" alt=""></img>
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
              placeholder="현재 비밀번호를 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            <img
              className="cursor-pointer absolute right-3 top-3.5 z-10"
              src="/images/delete.svg"
              alt=""
            />
          </div>
        </div>
        <div className="mb-2 flex flex-col">
          <span className="pl-4 text-[#222222] text-base font-medium mb-2">
            새 비밀번호
          </span>
          <div className="flex relative">
            <input
              placeholder="새 비밀번호를 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            <img
              className="cursor-pointer absolute right-3 top-3.5 z-10"
              src="/images/delete.svg"
              alt=""
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <span className="pl-4 text-[#222222] text-base font-medium mb-2">
            비밀번호 확인
          </span>
          <div className="flex relative">
            <input
              placeholder="새 비밀번호를 한번 더 입력하세요."
              className="w-full border border-[#D3D3D3] rounded-[8px] py-[13px] pl-4 mb-[18px] text-sm font-normal focus:outline-VsGreen"
            />
            <img
              className="cursor-pointer absolute right-3 top-3.5 z-10"
              src="/images/delete.svg"
              alt=""
            />
          </div>
        </div>
        <button className="bg-VsGreenLight w-full py-[11px] rounded-3xl font-medium text-xl text-graytypo hover:bg-VsGreen hover:text-[#222222]">
          저장
        </button>
      </div>
    </div>
  );
}
