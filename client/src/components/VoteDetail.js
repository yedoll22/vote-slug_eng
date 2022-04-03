import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function VoteDetail() {
  const [data, setData] = useState({});
  const history = useHistory();

  const { voteId } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/${voteId}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log("title", data.voteTitle);
  console.log("op2", data.voteOption2Count);

  return (
    <div>
      <div className="flex py-[19px] px-5 border-b-[1px] border-[#f2f2f2]">
        <img
          onClick={() => {
            history.goBack();
          }}
          src="/images/go-back-arrow.svg"
          className="mr-2 cursor-pointer"
        ></img>
        <img src="/images/vslogo.svg"></img>
      </div>
      <div className="pt-6">
        <div className="pl-5 text-xl font-medium text-[#222222]">
          투표 상세 보기
        </div>
        <div className="pt-6 px-5 mb-2">
          <div className="py-4 px-4 border border-[#a7a7a7] rounded-[12px] bg-transparent">
            <div className="flex justify-between mb-4">
              <div className="text-graytypo text-[14px] font-normal">
                {data.Category?.categoryTitle}
              </div>

              {data.voteOption1Count && (
                <div className="text-graytypo text-[14px] font-normal">
                  {data?.voteOption1Count + data?.voteOption2Count}
                </div>
              )}
            </div>

            <div className="text-base font-normal text-black mb-4">
              {data.voteTitle}
            </div>

            <div className="flex justify-center z-20">
              <div className="bg-[#7CE0AE] break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] relative mr-4">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2">{data.voteOption1}</div>
                  <div>80%</div>
                </div>

                <div className="absolute z-10 right-[-25px] top-[44px] rounded-full w-8 h-8 bg-VsRed flex justify-center items-center text-[14px] text-white font-normal border-[2px] border-white">
                  VS
                </div>
              </div>

              <div className="break-all h-[120px] flex justify-center items-center w-full p-2 border border-[#d3d3d3] rounded-[8px] z-0">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-2">{data.voteOption2}</div>
                  <div>20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-5 font-medium text-xs text-[#a7a7a7]">
          항목 눌러서 투표에 참여
        </div>
      </div>
    </div>
  );
}
