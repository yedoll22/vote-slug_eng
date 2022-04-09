import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory();
  const [opacity, setOpacity] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpacity(true), 100);
  }, []);

  return (
    <div
      className={
        opacity
          ? "pt-16 bg-VsGreenLight h-[100vh] transition-all duration-[3000ms]"
          : "pt-16 bg-VsGreenLight h-[100vh] opacity-0 duration-[3000ms]"
      }
    >
      <div className="pl-6 py-[10px] text-black font-bold text-[24px]">
        환영합니다!
      </div>
      <div className="pl-6 font-normal text-sm mb-[0.5px]">
        보트슬러그 회원가입이 완료되었습니다.
      </div>
      <div className="pl-6 font-normal text-sm mb-[90px]">
        로그인 후 보트슬러그의 서비스를 즐겨보세요!
      </div>

      <div className="flex justify-center pl-[50px] pr-[66px] mb-[100px]">
        <img className="w-full" src="/images/vslogo-vertical.png" alt="" />
      </div>

      <div className="px-5">
        <button
          onClick={() => history.replace("/login")}
          className="w-full py-3 bg-VsGreen rounded-[24px] text-[20px] font-medium"
        >
          로그인 하러 가기
        </button>
      </div>
    </div>
  );
};

export default Welcome;
