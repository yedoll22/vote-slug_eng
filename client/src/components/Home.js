import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

export default function Home({ category }) {
  const accessToken = useSelector((state) => state.accessToken.value);
  const isLogin = useSelector((state) => state.isLogin.value);
  const [voteInfo, setVoteInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const categoryHandler = async (e) => {
    const queryString = encodeURIComponent(e.target.value);
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote`,
        {
          params: { category: queryString },
        },
        {
          header: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setVoteInfo(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status === 404) {
          history.push("/login");
        } else {
          console.log(err);
        }
      });
  };

  const voteListHandler = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setVoteInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    voteListHandler();
  }, []);
  const voteUserPostHandler = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/vote`, {
        params: { type: "posted" },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setVoteInfo(res.data.createdVoteList);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setShowModal(true);
        } else if (err.response.status === 403 || err.response.status === 404) {
          history.push("/login");
        } else {
          console.log(err);
        }
      });
  };

  const voteUserParticipateHandler = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/vote`, {
        params: { type: "participated" },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setVoteInfo(res.data);
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
    <div className="relative">
      <div
        onClick={() => history.push("/votepost")}
        className="fixed top-[800px] right-0 z-50 cursor-pointer"
      >
        <img src="images/votePost.svg"></img>
      </div>
      <div className="flex py-[19px] px-5 justify-between border-b-[1px] border-[#f2f2f2]">
        <img src="images/vslogo.svg"></img>
        <img
          onClick={() => {
            if (isLogin) history.push("/mypage");
            else setShowModal(true);
          }}
          src="images/mypage.svg"
        ></img>
      </div>
      <div className="pl-5 pr-[14px] py-2">
        <div className="font-normal text-[14px] text-black mb-2">
          카테고리를 선택하세요
        </div>
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar">
          {category.map((ct) => {
            return (
              <button
                onClick={categoryHandler}
                className="shrink-0 px-3 border rounded-[19px] border-[#A7A7A7] mr-[11px] h-8 text-center text-[14px] text-graytypo "
                key={ct.id}
                value={ct.title}
              >
                {ct.title}
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-2 w-full bg-[#f2f2f2]"></div>
      <div className="grid grid-cols-3">
        <button className="py-4 font-medium text-graytypo border-b-[2px] border-VsGreen">
          최신 투표
        </button>
        <button
          onClick={voteUserParticipateHandler}
          className="py-4 font-medium text-graytypo"
        >
          내가 참여한 투표
        </button>
        <button
          onClick={voteUserPostHandler}
          className="py-4 font-medium text-graytypo"
        >
          내가 만든 투표
        </button>
      </div>
      <div className="pt-10 px-5 pb-10">
        {voteInfo.map((vote) => (
          <div
            onClick={() => history.push(`/vote/${vote.id}`)}
            key={vote.id}
            className="py-4 px-4 border border-[#a7a7a7] rounded-[12px] bg-transparent overflow-x-auto mb-10 last:mb-0"
          >
            <div className="flex justify-between mb-4">
              <div className="text-graytypo text-[14px] font-normal">
                {vote.Category.categoryTitle}
              </div>
              <div className="text-graytypo text-[14px] font-normal">
                {vote.voteOption1Count + vote.voteOption2Count}
              </div>
            </div>
            <div className="text-base font-normal text-black mb-4">
              {vote.voteTitle}
            </div>
            <div className="flex justify-center z-20">
              <div className="break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4">
                {vote.voteOption1}
                <div className="absolute z-10 right-[-25px] top-[44px] rounded-full w-8 h-8 bg-VsRed flex justify-center items-center text-[14px] text-white font-normal border-[2px] border-white">
                  VS
                </div>
              </div>
              <div className="break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] z-0">
                {vote.voteOption2}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && <LoginModal setShowModal={setShowModal} />}
    </div>
  );
}
