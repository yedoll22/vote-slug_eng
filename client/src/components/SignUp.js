import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function SignUp() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류메시지 상태저장
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [genderMessage, setGenderMessage] = useState("");
  const [dobMessage, setDobMessage] = useState();
  const [emailSignupMessage, setEmailSignupMessage] = useState("");
  const [nicknameSignupMessage, setNicknameSignupMessage] = useState("");

  // 유효성 검사
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isDob, setIsDob] = useState(false);
  const [isRegistedEmail, setIsRegistedEmail] = useState(false);
  const [isRegistedNickname, setIsRegistedNickname] = useState(false);

  useEffect(() => {
    if (password.length <= 7 || password.length >= 17) {
      setPasswordMessage("비밀번호는 8자리 이상 16자리 이하로 입력해주세요");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호입니다");
      setIsPassword(true);
    }
  }, [password]);

  const history = useHistory();

  const onSubmit = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`,
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
        if (err.response.data.message === "email overlap") {
          setEmailSignupMessage("이미 가입된 이메일입니다");
          setIsRegistedEmail(true);
        } else if (err.response.data.message === "nickname overlap") {
          setNicknameSignupMessage("이미 사용 중인 닉네임입니다");
          setIsRegistedNickname(true);
        } else {
          console.log(err);
        }
      });
  };

  const onChangeNickname = (e) => {
    const nicknameRegex = /^[가-힣A-Za-z0-9]{3,12}$/;
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (!nicknameRegex.test(currentNickname)) {
      setNicknameMessage(
        "닉네임은 한글, 영어, 숫자 최소 3자~12자리까지 설정 가능합니다."
      );
      setIsNickname(false);
    } else {
      setNicknameMessage("사용가능한 닉네임을 입력하셨습니다");
      setIsNickname(true);
    }
  };

  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸습니다");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식입니다");
      setIsEmail(true);
    }
  };

  const onChangePassword = (e) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("비밀번호가 일치합니다");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      setIsPasswordConfirm(false);
    }
  };

  const onChangeGender = (e) => {
    const genderCurrent = e.target.value;
    setGender(genderCurrent);
    if (gender === null) {
      setGenderMessage("");
      setIsGender(false);
    } else {
      setGenderMessage("성별을 선택하셨습니다");
      setIsGender(true);
    }
  };

  const onChangeDob = (e) => {
    const dobCurrent = e.target.value;
    setDob(dobCurrent);
    if (dob === undefined) {
      setDobMessage("");
      setIsDob(false);
    } else {
      setDobMessage("생년월일을 선택하셨습니다");
      setIsDob(true);
    }
  };
  return (
    <div className="pt-10">
      <div className="ml-5 mb-10 font-medium text-xl">회원가입</div>
      <div className="px-5">
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            이메일
          </span>
          <input
            type="text"
            onChange={onChangeEmail}
            className="pl-4 text-sm rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo font-normal focus:outline-VsGreen"
            placeholder="이메일을 입력하세요."
          ></input>
          {isRegistedEmail ? (
            <span>{emailSignupMessage}</span>
          ) : email.length > 0 ? (
            <span
              className={
                isEmail ? "text-sm text-indigo-500" : "text-sm text-red-400"
              }
            >
              {emailMessage}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            비밀번호
          </span>
          <input
            type="password"
            onChange={onChangePassword}
            className="pl-4 text-sm rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo font-normal focus:outline-VsGreen"
            placeholder="비밀번호를 입력하세요."
          ></input>
          {password.length > 0 && (
            <span
              className={
                isPassword ? "text-sm text-indigo-500" : "text-sm text-red-400"
              }
            >
              {passwordMessage}
            </span>
          )}
        </div>
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            비밀번호 확인
          </span>
          <input
            type="password"
            onChange={onChangePasswordConfirm}
            className="pl-4 text-sm rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo font-normal focus:outline-VsGreen"
            placeholder="비밀번호 확인을 입력하세요."
          ></input>
          {passwordConfirm.length > 0 && (
            <span
              className={
                isPasswordConfirm
                  ? "text-sm text-indigo-500"
                  : "text-sm text-red-400"
              }
            >
              {passwordConfirmMessage}
            </span>
          )}
        </div>
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            닉네임
          </span>
          <input
            type="text"
            onChange={onChangeNickname}
            className="pl-4 text-sm rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo font-normal focus:outline-VsGreen"
            placeholder="닉네임을 입력하세요."
          ></input>
          {isRegistedNickname ? (
            <span>{nicknameSignupMessage}</span>
          ) : nickname.length > 0 ? (
            <span
              className={
                isNickname ? "text-sm text-indigo-500" : "text-sm text-red-400"
              }
            >
              {nicknameMessage}
            </span>
          ) : null}
        </div>
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            성별
          </span>
          <div className="flex relative">
            <select
              onChange={onChangeGender}
              className="pl-4 rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo text-sm font-normal bg-transparent z-20 focus:outline-VsGreen"
              required
            >
              <option className="hidden" disabled selected>
                성별을 선택해주세요．
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Non binary</option>
            </select>
            <img
              className="absolute right-2 top-3 z-10"
              src="images/dropdown.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col pb-[18px] mb-2">
          <span className="ml-4 text-[#222222] font-medium text-base mb-2">
            생년월일
          </span>
          <input
            type="text"
            onChange={onChangeDob}
            className="pl-4 text-sm rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo font-normal focus:outline-VsGreen"
            placeholder="생년월일 8자리를 입력하세요."
          ></input>
        </div>

        <button
          disabled={
            !(
              isNickname &&
              isEmail &&
              isPassword &&
              isPasswordConfirm &&
              isGender &&
              isDob
            )
          }
          onClick={onSubmit}
          className="bg-VsGreen rounded-[24px] w-full h-11 text-xl font-medium"
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
}
