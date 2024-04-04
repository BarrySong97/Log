import React, { FC } from "react";
// import "../globals.css";

export interface LoadingProps {}
const Loading: FC<LoadingProps> = () => {
  return (
    <div className="h-[200px] w-full flex justify-center flex-col items-center">
      <div className="loader"></div>
      <div>正在从天启星加载数据</div>
    </div>
  );
};

export default Loading;
