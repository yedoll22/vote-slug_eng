const DeleteModal = ({ setShowDeleteModal, deleteVote }) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-[70%] max-w-[350px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative px-[50px] py-6 flex-auto">
              <p className="text-[#000000] font-bold text-base leading-relaxed text-center">
                정말 해당 투표를 삭제하시겠습니까?
              </p>
            </div>
            <div className="flex items-center justify-around border-t border-solid border-[#C4C4C4] rounded-b">
              <button
                className="text-black py-[13px] flex-1 h-full background-transparent font-normal text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowDeleteModal(false)}
              >
                닫기
              </button>
              <button
                className="border-l py-[13px]border-l-[#C4C4C4] flex-1 h-full text-VsRed font-bold text-sm"
                type="button"
                onClick={() => {
                  deleteVote();
                  setShowDeleteModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default DeleteModal;
