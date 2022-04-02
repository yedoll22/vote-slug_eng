import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Mypage(props) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({});
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  const getUserInfo = async () => {
    await axios
      .get(`${process.env.SERVER_EC2_ENDPOINT}/user/mypage`, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const { userid, email, nickname, gender, dob, createAt } = res.data;
          setUserInfo({ userid, email, nickname, gender, dob, createAt });
        } else if (res.status === 500) {
          //500일경우서버네트워크문제라고알려주기
        } else {
          //로그인이필요한페이지입니다모달창
          history.push("/login");
        }
      });
  };

  const deleteUserInfo = async () => {
    await axios
      .delete(`${process.env.SERVER_EC2_ENDPOINT}/user`, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          history.push("/home");
        } else if (res.status === 500) {
          // 500일경우서버네트워크문제라고알려주기
        } else {
          // 로그인이필요한페이지입니다모달창
          history.push("/login");
        }
      });
  };

  return (
    <>
      <div className="flex py-[19px] px-5">
        <img
          onClick={() => {}}
          className="mr-2 cursor-pointer"
          src="images/go-back-arrow.svg"
          alt=""
        />
        <img src="images/vslogo.svg"></img>
      </div>
      <div className="h-2 w-full bg-[#F2F2F2]"></div>
      <div className="pt-6">
        <div className="px-5 flex justify-between items-center mb-2">
          <div className="text-[20px] font-medium">user.nickname</div>
          <div className="text-[14px] font-medium text-graytypo">로그아웃</div>
        </div>

        <div className="flex px-5 text-graytypo text-[14px] font-normal mb-[39px]">
          <div className="mr-4">만든 투표 : 123,123</div>
          <div>참여한 투표 : 123,123</div>
        </div>

        <div className="px-5 text-base font-normal mb-2">회원 정보</div>
        <div className="bg-[#F4F4F4] h-[1px] mb-4"></div>

        <div className="px-5 mb-8">
          <div className="flex items-center mb-4">
            <div className="text-graytypo font-normal text-sm mr-[29px]">
              이메일
            </div>
            <div>user.email</div>
          </div>

          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <div className="text-graytypo font-normal text-sm mr-[29px]">
                닉네임
              </div>
              <div>user.nickname</div>
            </div>

            <div onClick={() => {}} className="flex cursor-pointer">
              <div className="mr-3 text-VsGreen font-normal text-sm">
                닉네임 변경
              </div>
              <img src="images/right-arrow.svg" alt="" />
            </div>
          </div>

          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <div className="text-graytypo font-normal text-sm mr-[16px]">
                비밀번호
              </div>
              <div>******</div>
            </div>

            <div onClick={() => {}} className="flex cursor-pointer">
              <div className="mr-3 text-VsGreen font-normal text-sm">
                비밀번호 변경
              </div>
              <img src="images/right-arrow.svg" alt="" />
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-graytypo font-normal text-sm mr-[16px]">
              성별<span className="text-transparent">공백</span>
            </div>
            <div>user.gender</div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-graytypo font-normal text-sm mr-4">
              생년월일
            </div>
            <div>user.dob</div>
          </div>
        </div>

        <div
          onClick={() => {}}
          className="text-center text-graytypo font-normal cursor-pointer hover:text-VsRed"
        >
          보트 슬러그 탈퇴를 원하시나요?
        </div>
      </div>
    </>
  );
}
