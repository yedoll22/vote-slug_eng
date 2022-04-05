import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayModal, hideModal } from "../slice/postModalSlice";

axios.defaults.withCredentials = true;

export default function VotePost() {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [category, setCategory] = useState({
    id: null,
    value: "카테고리를 선택하세요.",
  });
  const accessToken = useSelector((state) => state.accessToken.value);
  const [votePostinfo, setVotePostinfo] = useState({
    voteTitle: "",
    voteOption1: "",
    voteOption2: "",
  });
  const history = useHistory();

  const votePostinputHandler = (key) => (e) => {
    setVotePostinfo({ ...votePostinfo, [key]: e.target.value });
  };

  const validate = () => {
    const blankRegex = /\s/gi;
    if (
      votePostinfo.voteTitle.replace(blankRegex, "") ||
      votePostinfo.voteOption1.replace(blankRegex, "") ||
      votePostinfo.voteOption2.replace(blankRegex, "") ||
      category.id === null
    ) {
      setValidationError(true);
      setTimeout(() => {
        setValidationError(false);
      }, 3000);
      return;
    }
  };

  const votePostHandler = async () => {
    validate();
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote`,
        {
          voteTitle: votePostinfo.voteTitle,
          categoryId: category.id,
          voteOption1: votePostinfo.voteOption1,
          voteOption2: votePostinfo.voteOption2,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        history.push("/home");
        setTimeout(() => {
          dispatch(displayModal());
        }, 200);

        setTimeout(() => {
          dispatch(hideModal());
        }, 5000);
      })
      .catch((err) => {
        if (
          err.response.status === 401 ||
          err.response.status === 403 ||
          err.response.status === 404
        ) {
          history.push("/login");
        } else {
          console.log(err);
        }
      });
  };
  return (
    <>
      <div className="h-full bg-white">
        <div className="flex py-[19px] px-5 justify-between border-b-[1px] border-[#f2f2f2]">
          <img src="images/vslogo.svg" alt="vslogo"></img>
          <img
            onClick={() => history.push("/mypage")}
            src="images/mypage.svg"
            alt="mypage"
          ></img>
        </div>
        <div className="h-2 w-full bg-[#f2f2f2]"></div>
        <div className="pt-6 pb-10 overflow-y-visible">
          <div className="px-5">
            <div className="mb-[50px]">
              <div className="text-[20px] font-medium mb-8">투표 만들기</div>
              <div className="pb-[18px] mb-2">
                <div className="pl-4 mb-2">제목</div>
                <textarea
                  autoComplete="off"
                  onChange={votePostinputHandler("voteTitle")}
                  placeholder="투표 제목을 입력하세요."
                  type="text"
                  className="resize-none min-h-[76px] border-[1px] border-[#D3D3D3] w-full px-[16px] placeholder:leading-[20px] py-[20px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
                />
              </div>
              <div className="pb-[18px] mb-2">
                <div className="pl-4 mb-2">선택지 1</div>
                <textarea
                  autoComplete="off"
                  onChange={votePostinputHandler("voteOption1")}
                  placeholder="선택지의 내용을 입력하세요."
                  type="text"
                  className="resize-none  min-h-[76px] border-[1px] border-[#D3D3D3] w-full px-[16px] placeholder:leading-[20px] py-[20px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
                />
              </div>
              <div className="pb-[18px] mb-2">
                <div className="pl-4 mb-2">선택지 2</div>
                <textarea
                  autoComplete="off"
                  onChange={votePostinputHandler("voteOption2")}
                  placeholder="선택지의 내용을 입력하세요."
                  type="text"
                  className="resize-none min-h-[76px] border-[1px] border-[#D3D3D3] w-full placeholder:leading-[20px] py-[20px] px-[16px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
                />
              </div>

              <div className="pl-4 mb-2">카테고리</div>
              <div className="relative text-left">
                <div>
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    type="button"
                    className={
                      category.id
                        ? "inline-flex w-full justify-between rounded-[8px] border border-[#D3D3D3] px-4 py-[14px] bg-white text-sm font-normal text-black focus:outline-none focus:border-[3px] focus:border-VsGreen"
                        : "inline-flex w-full justify-between rounded-[8px] border border-[#D3D3D3] px-4 py-[14px] bg-white text-sm font-normal text-[#7A7A7A] focus:outline-none focus:border-[3px] focus:border-VsGreen"
                    }
                  >
                    {category.value}
                    {dropdown ? (
                      <img
                        className="absolute right-2 top-[12.5px] z-10"
                        src="images/dropdown-reverse.svg"
                        alt="dropdown"
                      />
                    ) : (
                      <img
                        className="absolute right-2 top-[12.5px] z-10"
                        src="images/dropdown.svg"
                        alt="dropdown"
                      />
                    )}
                  </button>
                </div>

                <div
                  className={
                    dropdown
                      ? "z-50 w-full absolute origin-top-right right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      : "z-50 hidden absolute w-full origin-top-right  right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  }
                >
                  <div onClick={() => setDropdown(!dropdown)} className="py-1">
                    <div
                      onClick={() => setCategory({ id: 2, value: "연애" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      연애
                    </div>
                    <div
                      onClick={() => setCategory({ id: 3, value: "음식" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      음식
                    </div>
                    <div
                      onClick={() => setCategory({ id: 4, value: "여행" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      여행
                    </div>
                    <div
                      onClick={() => setCategory({ id: 5, value: "일상" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      일상
                    </div>
                    <div
                      onClick={() => setCategory({ id: 6, value: "패션" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      패션
                    </div>
                    <div
                      onClick={() => setCategory({ id: 7, value: "etc" })}
                      className="text-black block px-4 py-2 text-sm hover:text-white hover:bg-VsGreen"
                    >
                      etc
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center pb-[150px]">
            <div
              className={
                validationError
                  ? "bottom-[10%] z-50 w-[60%] max-w-[500px] transition-all duration-1000 translate-x-0"
                  : "bottom-[10%] z-50 w-[60%] left-0 max-w-[500px] transition-all duration-1000 -translate-x-80 opacity-0"
              }
              role="alert"
            >
              <div className="bg-VsRed flex items-center text-white font-medium rounded-r px-4 py-2 ">
                <svg
                  className="fill-current h-5 w-5 text-white mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
                모든 항목을 입력해주세요.
              </div>
            </div>

            {/* <div
              className="bottom-[10%] z-50 w-[60%] max-w-[500px] transition-all duration-1000 translate-x-4"
              role="alert"
            >
              <div className="bg-VsRed flex items-center text-white font-medium rounded-r px-4 py-2">
                <svg
                  className="fill-current h-5 w-5 text-white mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
                모든 항목을 입력해주세요.
              </div>
            </div> */}

            <button
              onClick={() => history.goBack()}
              className="z-10 sticky text-[14px] font-medium text-[#7A7A7A] px-[19px] mr-[1px] h-9"
            >
              취소
            </button>
            <button
              onClick={votePostHandler}
              className="z-10 sticky bg-VsGreen rounded-[8px] h-9 px-4 text-[14px] font-medium"
            >
              투표 만들기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
