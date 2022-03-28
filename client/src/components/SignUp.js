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
          setErrorMessage("사용할 수 없는 이메일이나 닉네임입니다.(중복검사)");
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
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          SignUp
        </h1>

        <form>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="nickname"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="email"
            >
              e-mail
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="email"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="password1"
              onChange={passwordHandler("password1")}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="password_confirm"
            >
              Password Confirm{" "}
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="password2"
              onChange={passwordConfirmHandler("password2")}
            />
            <div>{pwErrorMessage}</div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="relative">
              <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-900 py-2 px-3 focus:outline-none focus:bg-white focus:border-gray-500">
                <option>Male</option>
                <option>Female</option>
                <option>Non binary</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="dateOfBirth"
            >
              DOB
            </label>
            <input
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="dateOfBirth"
              placeholder="yyyymmdd"
            />
          </div>
          <button
            onClick={onSubmit}
            className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded"
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
