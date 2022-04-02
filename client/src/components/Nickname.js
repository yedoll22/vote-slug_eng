import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nickname() {
  const modifyUserNickname = async () => {
    await axios
      .patch(
        `${process.env.SERVER_EC2_ENDPOINT}/user`,
        {
          headers: {
            // Authorization: `Bearer ${props.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
        {
          nickname: "nickname",
        }
      )
      .then((res) => {});
  };

  return <h1>edit</h1>;
}
