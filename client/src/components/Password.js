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
      <div>password</div>
      <div>new password</div>
      <input></input>
      <div>new password confirm</div>
    </div>
  );
}
