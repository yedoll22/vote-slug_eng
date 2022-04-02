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
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/mypage`, {
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
      .delete(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`, {
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
    <div>
      <header>
        <h1>MY Profile</h1>
      </header>
      <section>
        <div>
          <div>email</div>
          <div>{userInfo.email}</div>
        </div>
        <div>
          <div>Nickname</div>
          <div>{userInfo.nickname}</div>
          <Link to="/nickname">edit</Link>
        </div>
        <div>
          <div>Gender</div>
          <div>{userInfo.gender}</div>
        </div>
        <div>
          <div>Date of birth</div>
          <div>{userInfo.dob}</div>
        </div>
        <div>
          <Link to="/password">Password edit</Link>
          <button
            onClick={() => {
              // deleteUserInfo;
            }}
          >
            탈퇴
          </button>
          <Link to="/home">Home</Link>
        </div>
      </section>
    </div>
  );
}
