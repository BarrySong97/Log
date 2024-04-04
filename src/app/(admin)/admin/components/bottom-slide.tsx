import React, { FC } from "react";
export interface BottomSlideProps {
  children?: React.ReactNode;
  show: boolean;
}
const BottomSlide: FC<BottomSlideProps> = ({ children }) => {
  return <div className="absolute">{children}</div>;
};

export default BottomSlide;
