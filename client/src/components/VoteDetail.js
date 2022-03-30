import React, { useEffect, useState } from "react";

export default function VoteDetail({ dummyData, history, match }) {
  const [data, setData] = useState({});
  const { id } = match.params;

  console.log(dummyData);
  const getVoteById = () => {
    const array = dummyData.filter((x) => x.id === id);
    if (array.length === 1) {
      return array[0];
    }
    return null;
  };

  useEffect(() => {
    setData(getVoteById(id));
  }, []);

  return (
    <>
      <h2 align="center">투표 자세히 보기</h2>

      <div className="post-view-wrapper">
        {data ? (
          <>
            <div className="post-view-row">
              <label>제목</label>
              <label>{data.title}</label>
            </div>
            <div className="post-view-row">
              <label>카테고리</label>
              <label>{data.category}</label>
            </div>
            <div className="post-view-row">
              <label>옵션1</label>
              <label>{data.voteOption1}</label>
            </div>
            <div className="post-view-row">
              <label>옵션2</label>
              <div>{data.voteOption1}</div>
            </div>
          </>
        ) : (
          "해당 게시글을 찾을 수 없습니다."
        )}
        <button
          className="post-view-go-list-btn"
          onClick={() => history.goBack()}
        >
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
}
