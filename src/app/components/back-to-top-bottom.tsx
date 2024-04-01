"use client";
import React, { FC, useEffect, useState } from "react";
import useScrollFunctions from "../hooks";
import { Button } from "@nextui-org/react";
import { SolarMapArrowDownBold, SolarMapArrowUpBold } from "@/assets/icon";
export interface BackToTopBottomProps {}
const BackToTopBottom: FC<BackToTopBottomProps> = () => {
  const { isAtBottom, isAtTop, scrollToBottom, scrollToTop } =
    useScrollFunctions();
  return (
    <div className="fixed bottom-20 flex right-6 gap-2 z-[100]">
      {!isAtBottom ? (
        <Button isIconOnly size="sm" variant="flat" onClick={scrollToBottom}>
          <SolarMapArrowDownBold />
        </Button>
      ) : null}{" "}
      {!isAtTop ? (
        <Button isIconOnly size="sm" variant="flat" onClick={scrollToTop}>
          <SolarMapArrowUpBold />
        </Button>
      ) : null}
    </div>
  );
};

export default BackToTopBottom;
