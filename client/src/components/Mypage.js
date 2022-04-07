import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal";

export default function Mypage() {
  const history = useHistory();
  const accessToken = useSelector((state) => state.accessToken.value);
  const [userInfo, setUserInfo] = useState({});
  const [isLogoutAction, setIsLogoutAction] = useState(false);
  const [isSecessionAction, setIsSecessionAction] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/mypage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const { email, nickname, gender, dob } = res.data;
          setUserInfo({ email, nickname, gender, dob });
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          //서버오류 페이지 만들어서 거기로 유저 이동
        } else {
          history.push("/login");
        }
      });
  };

  return (
    <>
      <div className="flex py-[19px] px-5">
        <img
          onClick={() => history.goBack()}
          className="mr-2 cursor-pointer"
          src="images/go-back-arrow.svg"
          alt=""
        />
        <img src="images/vslogo.svg" alt=""></img>
      </div>
      <div className="h-2 w-full bg-[#F2F2F2]"></div>
      <div className="pt-6">
        <div className="px-5 flex justify-between items-center mb-2">
          <div className="text-[20px] font-medium">{userInfo.nickname}</div>
          <div
            onClick={() => setIsLogoutAction(true)}
            className="cursor-pointer text-[14px] font-medium text-graytypo"
          >
            로그아웃
          </div>
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
            <div>{userInfo.email}</div>
          </div>

          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <div className="text-graytypo font-normal text-sm mr-[29px]">
                닉네임
              </div>
              <div>{userInfo.nickname}</div>
            </div>

            <div
              onClick={() => {
                history.push(`/nickname?nickname=${userInfo.nickname}`);
              }}
              className="flex cursor-pointer"
            >
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

            <div
              onClick={() => {
                history.push("/password");
              }}
              className="flex cursor-pointer"
            >
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
            <div>{userInfo.gender}</div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-graytypo font-normal text-sm mr-4">
              생년월일
            </div>
            <div>{userInfo.dob}</div>
          </div>
        </div>

        <div
          onClick={() => setIsSecessionAction(true)}
          className="text-center text-graytypo font-normal cursor-pointer hover:text-VsRed"
        >
          보트 슬러그 탈퇴를 원하시나요?
        </div>
      </div>

      {isLogoutAction && (
        <Modal
          type="logout"
          title="정말 로그아웃하시겠습니까?"
          left="취소"
          right="로그아웃"
          setIsLogoutAction={setIsLogoutAction}
        />
      )}
      {isSecessionAction && (
        <Modal
          type="secession"
          title="정말 탈퇴하시겠습니까?"
          left="취소"
          right="확인"
          setIsSecessionAction={setIsSecessionAction}
        />
      )}
    </>
  );
}
