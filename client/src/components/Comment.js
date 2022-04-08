import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "./Modal";

axios.defaults.withCredentials = true;

const Comment = ({ voteId }) => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.isLogin.value);
  const accessToken = useSelector((state) => state.accessToken.value);
  const [commentList, setCommentList] = useState([]);
  const [commentDeleteAction, setCommentDeleteAction] = useState(false);
  const [commentDeleteTarget, setCommentDeleteTarget] = useState(null);
  const [commentWriteAciton, setCommentWriteAction] = useState(false);

  const getComment = async () => {
    if (isLogin) {
      const commentRequest = await axios.get(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment/${voteId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCommentList(commentRequest.data);
    } else {
      const commentRequest = await axios.get(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment/${voteId}`
      );
      setCommentList(commentRequest.data);
    }
  };

  useEffect(() => {
    getComment();
  }, [commentDeleteAction]);

  return (
    <>
      <div>
        <div className="flex justify-between pb-4 px-5">
          <div className="text-xl font-medium">코멘트</div>
          <button
            onClick={() => {
              if (isLogin) history.push(`/comment/${voteId}`);
              else setCommentWriteAction(true);
            }}
            className="pr-[9px] text-[#A7A7A7] text-xs font-medium hover:text-VsGreen"
          >
            작성하기
          </button>
        </div>

        {commentList.map((comment) => {
          return (
            <div key={comment.id}>
              <div className="px-5 py-4 border-t-[0.5px] last:border-b">
                <div className="mb-2 font-semibold text-sm">
                  {comment.isMine ? (
                    <div className="flex items-center">
                      <div className="mr-2">{comment.nickname}</div>
                      <div className="h-2 w-2 rounded-full bg-VsGreen"></div>
                    </div>
                  ) : (
                    <div>{comment.nickname}</div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="font-light text-black text-sm break-all">
                    {comment.content}
                  </div>
                  {comment.isMine && (
                    <div className="flex text-[12px]">
                      <div
                        onClick={() =>
                          history.push(
                            `/comment/${voteId}?id=${comment.id}&type=modify`
                          )
                        }
                        className="px-1 cursor-pointer hover:text-VsGreen"
                      >
                        수정
                      </div>
                      <div
                        onClick={() => {
                          setCommentDeleteAction(true);
                          setCommentDeleteTarget(comment.id);
                        }}
                        className="px-1 cursor-pointer hover:text-VsRed"
                      >
                        삭제
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {commentDeleteAction && (
        <Modal
          type="deleteComment"
          title="해당 코멘트를 삭제하시겠습니까?"
          left="취소"
          right="확인"
          setCommentDeleteAction={setCommentDeleteAction}
          commentDeleteTarget={commentDeleteTarget}
        />
      )}

      {commentWriteAciton && (
        <Modal
          type="login"
          title="로그인이 필요합니다."
          left="닫기"
          right="로그인"
          setCommentWriteAction={setCommentWriteAction}
        />
      )}
    </>
  );
};

export default Comment;
