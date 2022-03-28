import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [pwErrorMessage, setPwErrorMessage] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    password1: "",
    password2: "",
  });

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    gender: "",
    dob: "",
  });

  const history = useHistory();

  const onSubmit = async () => {
    const { email, password, nickname, gender, dob } = userInfo;
    const { password1, password2 } = passwordInfo;

    if (password1 === password2) {
      setUserInfo({ password: password2 });
      await axios
        .post(
          "/user",
          {
            email,
            password,
            nickname,
            gender,
            dob,
          },
          {
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          setErrorMessage("사용할 수 없는 이메일이나 닉네임입니다.");
        });
    } else {
      setPwErrorMessage("비밀번호가 일치하지 않습니다");
    }
  };

  const passwordHandler = (key) => (e) => {
    setPasswordInfo({ [key]: e.target.value });
  };

  const passwordConfirmHandler = (key) => (e) => {
    setPasswordInfo({ ...passwordInfo, [key]: e.target.value });
  };

  console.log(passwordInfo.password1, passwordInfo.password2);

  return (
    <div class="flex justify-center items-center h-screen w-full">
      <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          SignUp
        </h1>
        <form>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="nickname">
              Nickname
            </label>
            <input
              class="border py-2 px-3 text-grey-800"
              type="text"
              name="nickname"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="email">
              e-mail
            </label>
            <input
              class="border py-2 px-3 text-grey-800"
              type="text"
              name="email"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="password">
              Password
            </label>
            <input
              class="border py-2 px-3 text-grey-800"
              type="text"
              name="password1"
              onChange={passwordHandler("password1")}
            />
          </div>
          <div class="flex flex-col mb-4">
            <label
              class="mb-2 font-bold text-lg text-gray-900"
              for="password_confirm"
            >
              Password Confirm{" "}
            </label>
            <input
              class="border py-2 px-3 text-grey-800"
              type="text"
              name="password2"
              onChange={passwordConfirmHandler("password2")}
            />
            <div>{pwErrorMessage}</div>
          </div>

          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900" for="gender">
              Gender
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-white border border-gray-200 text-gray-900 py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-500">
                <option>Male</option>
                <option>Female</option>
                <option>Non binary</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-4">
            <label
              class="mb-2 font-bold text-lg text-gray-900"
              for="dateOfBirth"
            >
              DOB
            </label>
            <input
              class="border py-2 px-3 text-grey-800"
              type="text"
              name="dateOfBirth"
              placeholder="yyyymmdd"
            />
          </div>
          <button
            onClick={onSubmit}
            class="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
          >
            Confirm
          </button>
          <div className="text-red">{errorMessage}</div>
        </form>
        {/* <a class="block w-full text-center no-underline mt-4 text-sm text-gray-700 hover:text-gray-900" href="/login">Already have an account?</a> */}
      </div>
    </div>
  );
}
