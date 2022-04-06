import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import VotePostModal from "./VotePostModal";
import { useSelector } from "react-redux";
import LoggedinModal from "./LoggedinModal";
import DeleteModal from "./DeleteModal";
axios.defaults.withCredentials = true;

export default function VoteDetail() {
  const [voteData, setVoteData] = useState({});
  const [postData, setPostData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [participation, setParticipation] = useState(false);
  const [option1Percent, setOption1Percent] = useState(null);
  const [option2Percent, setOption2Percent] = useState(null);

  const history = useHistory();
  const { voteId } = useParams();
  const accessToken = useSelector((state) => state.accessToken.value);
  const isLogin = useSelector((state) => state.isLogin.value);
  const voteFilter = useSelector((state) => state.voteFilter.value);

  const deleteVoteHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/${voteId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      history.push("/");
    } catch (err) {
      const status = err.response.status;
      if (status === 401 || status === 403 || status === 404) {
        history.push("/");
      }
    }
  };

  const voteInfoHandler = async () => {
    if (isLogin) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/${voteId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((result) => {
          console.log("server parti", result.data.participation);
          setVoteData(result.data.selectedVote);
          setParticipation(result.data.participation);
          if (
            result.data.voteOption1Count === 0 &&
            result.data.voteOption2Count === 0
          ) {
            setOption1Percent(0);
            setOption2Percent(0);
          } else {
            setOption1Percent(
              Math.round(
                (100 * result.data.selectedVote.voteOption1Count) /
                  (result.data.selectedVote.voteOption1Count +
                    result.data.selectedVote.voteOption2Count)
              )
            );
            setOption2Percent(
              Math.round(
                (100 * result.data.selectedVote.voteOption2Count) /
                  (result.data.selectedVote.voteOption1Count +
                    result.data.selectedVote.voteOption2Count)
              )
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await axios
        .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/${voteId}`)
        .then((result) => {
          setVoteData(result.data.selectedVote);
          if (
            result.data.voteOption1Count === 0 &&
            result.data.voteOption2Count === 0
          ) {
            setOption1Percent(0);
            setOption2Percent(0);
          } else {
            setOption1Percent(
              Math.round(
                (100 * result.data.selectedVote.voteOption1Count) /
                  (result.data.selectedVote.voteOption1Count +
                    result.data.selectedVote.voteOption2Count)
              )
            );
            setOption2Percent(
              Math.round(
                (100 * result.data.selectedVote.voteOption2Count) /
                  (result.data.selectedVote.voteOption1Count +
                    result.data.selectedVote.voteOption2Count)
              )
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  useEffect(() => {
    voteInfoHandler();
  }, [participation]);

  const postDataHandler = (key) => () => {
    setPostData({ voteId: voteId, [key]: true });
    setShowModal(true);
  };
  const voteParticipateHandler = async () => {
    await axios
      .patch(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote`, postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setVoteData(result.data);
        setParticipation(true);
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

  const winnerClass = (optionPercent) => {
    if (participation) {
      if (optionPercent > 50) {
        return "bg-VsGreenLight break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4 cursor-pointer";
      } else if (optionPercent === 50) {
        return "bg-VsyellowLight break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4 cursor-pointer";
      } else {
        return "break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4 cursor-pointer";
      }
    }
    return "break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4 cursor-pointer";
  };
  return (
    <div>
      <div className="flex py-[19px] px-5 border-b-[1px] border-[#f2f2f2]">
        <img
          onClick={() => {
            history.goBack();
          }}
          src="/images/go-back-arrow.svg"
          className="mr-2 cursor-pointer"
          alt="gobackarrow"
        ></img>
        <img src="/images/vslogo.svg" alt="vslogo"></img>
      </div>
      <div className="pt-6">
        <div className="flex items-center justify-between px-5 text-xl font-medium text-[#222222]">
          <div>투표상세보기</div>
          {voteFilter === "posted" ? (
            <div onClick={() => setShowDeleteModal(true)}>
              <img
                className="w-6 cursor-pointer"
                src="/images/delete-vote-icon.png"
                alt=""
              />
            </div>
          ) : null}
        </div>
        <div className="pt-6 px-5 mb-2">
          <div className="py-4 px-4 border border-[#a7a7a7] rounded-[12px] bg-transparent">
            <div className="flex justify-between mb-4">
              <div className="text-graytypo text-[14px] font-normal flex">
                {voteData.Category?.categoryTitle === "음식" && (
                  <div className="mr-3">🍔</div>
                )}
                {voteData.Category?.categoryTitle === "연애" && (
                  <div className="mr-3">💌</div>
                )}
                {voteData.Category?.categoryTitle === "여행" && (
                  <div className="mr-3">🛩</div>
                )}
                {voteData.Category?.categoryTitle === "일상" && (
                  <div className="mr-3">😌</div>
                )}
                {voteData.Category?.categoryTitle === "패션" && (
                  <div className="mr-3">👬</div>
                )}
                {voteData.Category?.categoryTitle === "etc" && (
                  <div className="mr-3">🎸</div>
                )}
                {voteData.Category?.categoryTitle}
              </div>
              {/* 
              {voteData.voteOption1Count && ( */}
              <div className="flex items-center">
                <div className="pb-[0.5px]">
                  <img
                    className="w-4 h-4 mr-[5px] opacity-50"
                    src="/images/view-icon.png"
                    alt=""
                  />
                </div>

                <div className="text-graytypo text-[14px] font-normal">
                  {voteData.voteOption1Count + voteData.voteOption2Count}
                </div>
              </div>
              {/* )} */}
            </div>

            <div className="text-base font-normal text-black mb-4">
              {voteData.voteTitle}
            </div>

            <div className="flex justify-center z-20">
              <button
                value={"voteOption1"}
                onClick={postDataHandler("voteOption1")}
                className={winnerClass(option1Percent)}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2">{voteData.voteOption1}</div>
                  {participation && <div>{option1Percent}%</div>}
                </div>

                <div className="absolute z-10 right-[-25px] top-[44px] rounded-full w-8 h-8 bg-VsRed flex justify-center items-center text-[14px] text-white font-normal border-[2px] border-white">
                  VS
                </div>
              </button>
              <button
                value={"voteOption2"}
                onClick={postDataHandler("voteOption2")}
                className={winnerClass(option2Percent)}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2">{voteData.voteOption2}</div>
                  {participation && <div>{option2Percent}%</div>}
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-5 font-medium text-xs text-[#a7a7a7]">
          항목 눌러서 투표에 참여
        </div>
      </div>
      {showModal && (
        <VotePostModal
          setShowModal={setShowModal}
          voteParticipateHandler={voteParticipateHandler}
          voteInfoHandler={voteInfoHandler}
        />
      )}
      {participation && showModal && (
        <LoggedinModal setShowModal={setShowModal} />
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          deleteVote={deleteVoteHandler}
        />
      )}
    </div>
  );
}
