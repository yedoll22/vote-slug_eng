import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const CommentPost = () => {
  const history = useHistory();
  const { voteId } = useParams();
  const ref = useRef();
  const [content, setContent] = useState("");
  const accessToken = useSelector((state) => state.accessToken.value);
  const commentId = history.location.search.split("=")[1];
  const modify = history.location.search.split("&")[1] || null;

  useEffect(() => {
    if (modify) getOriginComment();
  }, []);

  const getOriginComment = async () => {
    try {
      const getRequest = await axios.get(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment/modify/${commentId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setContent(getRequest.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment`,
        { content, voteId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const patchComment = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment`,
        { content, commentId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-center py-[19px] font-medium text-xl">
        코멘트 작성
      </div>
      <div className="h-1 w-full bg-[#F2F2F2]"></div>
      <div className="pt-[33px] px-5 relative">
        <textarea
          ref={ref}
          autoComplete="off"
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
          className="focus:outline-none z-50 focus:border-VsGreen focus:border-2 no-scrollbar resize-none border border-[#D3D3D3] rounded-lg w-full h-[132px] pt-[14px] px-4 mb-[19px]"
        />
        {content.length ? null : (
          <div
            onClick={() => ref.current.focus()}
            className="text-gray-400 text-[14px] absolute left-10 top-[50px] z-0"
          >
            <div>여러분의 생각을 자유롭게 적어주세요.</div>
            <div>• 타인에 대한 비방, 욕설은 금지합니다.</div>
            <div>• 광고나 불법자료에 대한 내용은 금지합니다.</div>
          </div>
        )}

        <div className="flex justify-end h-9">
          <button
            onClick={() => history.goBack()}
            className="w-16 h-full text-[#7A7A7A] font-medium text-sm"
          >
            취소
          </button>
          <button
            onClick={() => {
              if (modify) patchComment();
              else postComment();
            }}
            className="w-[100px] h-full rounded-lg font-medium text-sm bg-VsGreen"
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPost;
