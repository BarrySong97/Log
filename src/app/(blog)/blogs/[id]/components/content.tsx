"use client";
import React, { FC } from "react";
export interface ContentProps {
  children: React.ReactNode;
}
const Content: FC<ContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Content;
