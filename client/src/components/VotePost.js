import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function VotePost({ accessToken }) {
  const [votePostinfo, setVotePostinfo] = useState({
    voteTitle: "",
    category: "",
    voteOption1: "",
    voteOption2: "",
  });
  const history = useHistory();

  const votePostinputHandler = (key) => (e) => {
    setVotePostinfo({ ...votePostinfo, [key]: e.target.value });
  };

  const votePostHandler = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote`,
        {
          voteTitle: votePostinfo.voteTitle,
          category: votePostinfo.category,
          voteOption1: votePostinfo.voteOption1,
          voteOption2: votePostinfo.voteOption2,
        },
        {
          header: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((res) => {
        history.push("/home");
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
    <div>
      <div className="flex py-[19px] px-5 justify-between border-b-[1px] border-[#f2f2f2]">
        <img src="images/vslogo.svg"></img>
        <img
          onClick={() => history.push("/mypage")}
          src="images/mypage.svg"
        ></img>
      </div>
      <div className="h-2 w-full bg-[#f2f2f2]"></div>
      <div className="pt-6 px-5 pb-10">
        <div className="mb-[50px]">
          <div className="text-[20px] font-medium mb-10">투표 만들기</div>
          <div className="pb-[18px] mb-2">
            <div className="pl-4 mb-2">제목</div>
            <textarea
              onChange={votePostinputHandler("voteTitle")}
              placeholder="투표 제목을 입력하세요."
              type="text"
              className="min-h-[76px] border-[1px] border-[#D3D3D3] w-full px-[16px] placeholder:leading-[20px] py-[20px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
            />
          </div>
          <div className="pb-[18px] mb-2">
            <div className="pl-4 mb-2">선택지 1</div>
            <textarea
              onChange={votePostinputHandler("voteOption1")}
              placeholder="선택지의 내용을 입력하세요."
              type="text"
              className="min-h-[76px] border-[1px] border-[#D3D3D3] w-full px-[16px] placeholder:leading-[20px] py-[20px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
            />
          </div>
          <div className="pb-[18px] mb-2">
            <div className="pl-4 mb-2">선택지 2</div>
            <textarea
              onChange={votePostinputHandler("voteOption2")}
              placeholder="선택지의 내용을 입력하세요."
              type="text"
              className="h-[76px] border-[1px] border-[#D3D3D3] w-full placeholder:leading-[20px] py-[20px] px-[16px] text-[14px] font-normal placeholder:text-[#7A7A7A] rounded-[8px] focus:outline-VsGreen break-all no-scrollbar"
            />
          </div>
          <div className="pb-[18px]">
            <div className="pl-4 mb-2">카테고리</div>
            <div className="flex relative">
              <select
                onChange={votePostinputHandler("category")}
                className="pl-4 rounded-lg border border-[#d3d3d3] w-full h-12 text-graytypo text-sm font-normal bg-transparent z-20 focus:outline-VsGreen"
                required
              >
                <option className="hidden" defaultValue>
                  카테고리를 선택하세요.
                </option>
                <option>연애</option>
                <option>일상</option>
                <option>여행</option>
                <option>음식</option>
                <option>패션</option>
                <option>etc</option>
              </select>
              <img
                className="absolute right-2 top-3 z-10"
                src="images/dropdown.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="text-[14px] font-medium text-[#7A7A7A] px-[19px] mr-[1px] h-9">
            취소
          </button>
          <button
            onClick={votePostHandler}
            className="bg-VsGreen rounded-[8px] h-9 px-4 text-[14px] font-medium"
          >
            투표 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
