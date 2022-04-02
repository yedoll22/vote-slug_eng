import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export default function VoteDetail() {
  const [data, setData] = useState({});
  const { voteId } = useParams();
  const history = useHistory();

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

  return (
    <>
      <h2 align="center">투표 자세히 보기</h2>

      <div className="post-view-wrapper">
        {data ? (
          <>
            <div className="post-view-row">
              <label>제목</label>
              <label>{data.voteTitle}</label>
            </div>
            <div className="post-view-row">
              <label>카테고리</label>
              <label>{data.Category?.categoryTitle}</label>
            </div>
            <div className="post-view-row">
              <label>옵션1</label>
              <label>{data.voteOption1}</label>
            </div>
            <div className="post-view-row">
              <label>옵션2</label>
              <div>{data.voteOption2}</div>
            </div>
          </>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
        <button className="post-view-go-list-btn" onClick={() => {}}>
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
}
