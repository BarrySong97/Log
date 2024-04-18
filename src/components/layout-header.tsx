"use client";

import Image from "next/image";
import { Button, Link as NextUILink } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, { FC, useEffect, useRef } from "react";
import { MaterialSymbolsAddLocation } from "../assets/icon";
import { contactList } from "../app/contact";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useRequest } from "ahooks";
import { User } from "@/app/api/model";
export interface LayoutHeaderProps {}
const LayoutHeader: FC<LayoutHeaderProps> = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const preRouterRef = useRef<string>();
  const navMenu = [
    {
      title: "文章",
      desc: "言之有物，行之有术",
      href: "/blogs",
    },
    {
      title: "项目",
      desc: "见微知著,事半功倍",
      href: "/projects",
    },
    {
      title: "关于我",
      desc: "探索宇宙，永葆青春",
      href: "/about",
    },
  ];
  useEffect(() => {
    if (preRouterRef.current !== pathname) {
      preRouterRef.current = pathname;
    }
  }, [pathname]);
  const { data } = useRequest<User, any>(() =>
    fetch("/api/setting")
      .then((v) => v.json())
      .then((v) => v.data)
  );
  return (
    <>
      <div className="z-[100]   sticky top-0 backdrop-blur-lg py-4 backdrop-saturate-150 bg-background/70  w-full  font-mono text-sm lg:flex">
        <div className="max-w-[64rem] basis-[100%] flex mx-auto items-center justify-between">
          <div className="items-center  px-4 lg:px-0  basis-[100%] flex h-auto w-full   justify-between bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none bg-transparent">
            <div className="flex items-center sm:gap-4 bg-transparent">
              {!isHomePage && (
                <Link href={"/"}>
                  <motion.img
                    src="/blogger.jpg"
                    alt="blogger"
                    layoutId={"blogger"}
                    className={`object-cover hidden sm:block rounded-full w-[48px] h-[48px] `}
                  />
                </Link>
              )}
              <div>
                <NextUILink
                  className="text-2xl font-semibold"
                  color="foreground"
                  href="/"
                >
                  BarrySong
                </NextUILink>
                {!isHomePage && (
                  <div className="hidden  sm:flex  -ml-2">
                    {contactList.map((v) => {
                      return (
                        <Button
                          className="h-unit-9"
                          as={"a"}
                          target="_blank"
                          href={(data as any)?.[v.key as any]}
                          key={v.title}
                          isIconOnly
                          variant="light"
                        >
                          <img
                            src={v.icon}
                            className={v.key === "twitter" ? "rounded-md" : ""}
                            height={16}
                            width={16}
                            alt={v.title}
                          />
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4  justify-between pb-1 self-end bg-transparent">
              {!isHomePage
                ? navMenu.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="text-base relative font-sans"
                        rel="noopener noreferrer"
                      >
                        {isActive && (
                          <motion.span
                            // layoutId="nav_underline"
                            className="absolute left-0 top-full block h-[2px] w-full bg-gray-500"
                          ></motion.span>
                        )}
                        <span
                          style={{ zIndex: 100 }}
                          className={`tracking-widest text-medium hover:text-default-900 ${
                            isActive ? "text-black" : "text-default-500"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      {isHomePage && (
        <div className="w-full max-w-5xl mb-4 lg:mb-0 ">
          <div className="flex-col-reverse  flex lg:flex-row justify-between">
            <div className="self-center">
              <div className="mb-4">
                <div className="flex gap-1 justify-center lg:justify-start items-center  lg:mx-0 ">
                  <MaterialSymbolsAddLocation className="text-large" />
                  <span className="text-small text-default-500">贵州贵阳</span>
                </div>
                <div className="font-semibold ">
                  <TextGenerateEffect
                    words={"正在远程的全栈偏前的软件工程师".split("").join(" ")}
                  />
                </div>
              </div>
              <div className="gap-4 flex justify-center lg:justify-start items-center">
                {contactList.map((v) => {
                  return (
                    <Button
                      className="h-unit-9"
                      as={"a"}
                      target="_blank"
                      href={(data as any)?.[v.key as any]}
                      key={v.title}
                      isIconOnly
                      variant="light"
                    >
                      <img
                        src={v.icon}
                        className={v.key === "twitter" ? "rounded-md" : ""}
                        height={28}
                        width={28}
                        alt={v.title}
                      />
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="relative mb-4 lg:mb-0 flex place-items-center justify-center lg:justify-end    my-4 lg:my-0">
              <div className="relative pointer-events-auto  z-[999]">
                <motion.img
                  src="/blogger.jpg"
                  alt="blogger"
                  layoutId="blogger"
                  className="object-cover rounded-full w-[100px] h-[100px] lg:w-[280px] lg:h-[280px] "
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isHomePage && (
        <div className=" grid text-center gap-4 lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          {navMenu.map((item) => {
            return (
              <CardContainer
                key={item.title}
                className="inter-var w-full h-full"
              >
                <CardBody className="w-full">
                  <CardItem translateZ="100" className="w-full">
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group block rounded-lg  border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                      rel="noopener noreferrer"
                    >
                      <h2 className={`mb-3 text-2xl font-semibold`}>
                        {item.title}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                          -&gt;
                        </span>
                      </h2>
                      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        {item.desc}
                      </p>
                    </Link>
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      )}
    </>
  );
};

export default LayoutHeader;
