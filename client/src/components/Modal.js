import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeAccessToken } from "../slice/accessTokenSlice";
import { setVoteFilter } from "../slice/voteFilterSlice";
import { logoutHandler } from "../slice/isLoginSlice";
import { hideModal } from "../slice/modalSlice";

axios.defaults.withCredentials = true;

const Modal = ({
  type,
  title,
  left,
  right,
  setDeleteAction,
  postData,
  setVoteData,
  setParticipation,
  setIsLogoutAction,
  setIsSecessionAction,
  setCommentDeleteAction,
  commentDeleteTarget,
  setCommentWriteAction,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { voteId } = useParams();
  const accessToken = useSelector((state) => state.accessToken.value);

  const participateVote = async () => {
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
        )
          history.push("/login");
        else console.log(err);
      });
  };

  const deleteVote = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/${voteId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      history.push("/");
    } catch (err) {
      const status = err.response.status;
      if (status === 401 || status === 403 || status === 404) history.push("/");
    }
  };

  const deleteComment = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/vote/comment/${commentDeleteTarget}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setCommentDeleteAction(false);
    } catch (err) {
      const status = err.response.status;
      if (status === 401 || status === 403 || status === 404) history.push("/");
    }
  };

  const logout = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(removeAccessToken());
        dispatch(setVoteFilter("latest"));
        dispatch(logoutHandler());
        history.push("/login");
      });
  };

  const secession = async () => {
    await axios
      .delete(`${process.env.REACT_APP_SERVER_EC2_ENDPOINT}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(setVoteFilter("latest"));
        dispatch(logoutHandler());
        dispatch(removeAccessToken());
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const rightButtonClass = () => {
    if (type === "login" || type === "participateVote")
      return "border-l py-[13px] border-l-[#C4C4C4] flex-1 h-full text-VsGreen font-bold text-sm";
    else if (
      type === "delete" ||
      type === "secession" ||
      type === "logout" ||
      type === "deleteComment"
    )
      return "border-l py-[13px] border-l-[#C4C4C4] flex-1 h-full text-VsRed font-bold text-sm hover:text-white hover:bg-VsRed hover:rounded-br-lg";
  };

  const confirmFunction = () => {
    if (type === "login") history.push("/login");
    else if (type === "delete") deleteVote();
    else if (type === "secession") secession();
    else if (type === "participateVote") participateVote();
    else if (type === "logout") logout();
    else if (type === "deleteComment") deleteComment();
  };

  return (
    <>
      <div className="z-50">
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-[70%] max-w-[350px]">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="relative py-6 flex-auto">
                <p className="text-[#000000] font-bold text-base leading-relaxed text-center">
                  {title}
                </p>
              </div>

              {left ? (
                <div className="flex items-center justify-around border-t border-solid border-[#C4C4C4] rounded-b">
                  <button
                    className="text-black py-[13px] flex-1 h-full background-transparent font-normal text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      dispatch(hideModal());
                      if (setDeleteAction) setDeleteAction(false);
                      if (setIsLogoutAction) setIsLogoutAction(false);
                      if (setIsSecessionAction) setIsSecessionAction(false);
                      if (setCommentDeleteAction) setCommentDeleteAction(false);
                      if (setCommentWriteAction) setCommentWriteAction(false);
                    }}
                  >
                    {left}
                  </button>
                  <button
                    className={rightButtonClass()}
                    type="button"
                    onClick={() => {
                      confirmFunction();
                      dispatch(hideModal());
                      if (setDeleteAction) setDeleteAction(false);
                      if (setIsLogoutAction) setIsLogoutAction(false);
                      if (setIsSecessionAction) setIsSecessionAction(false);
                      if (setCommentWriteAction) setCommentWriteAction(false);
                    }}
                  >
                    {right}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-around border-t border-solid border-[#C4C4C4] rounded-b">
                  <button
                    className="text-black py-[11px] flex-1 h-full background-transparent font-normal rounded-b text-sm outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-VsGreen hover:rounded-b-lg hover:text-white"
                    type="button"
                    onClick={() => {
                      confirmFunction();
                      dispatch(hideModal());
                      if (setDeleteAction) setDeleteAction(false);
                      if (setIsLogoutAction) setIsLogoutAction(false);
                      if (setIsSecessionAction) setIsSecessionAction(false);
                      if (setCommentDeleteAction) setCommentDeleteAction(false);
                    }}
                  >
                    {right}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </>
  );
};

export default Modal;
