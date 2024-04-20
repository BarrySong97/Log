"use client";
import * as React from "react";
import Giscus from "@giscus/react";

const id = "inject-comments";

const Comments = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id={id} className="w-full">
      {mounted ? (
        <Giscus
          id={id}
          repo="BarrySong97/Log"
          repoId="R_kgDOLn1tsg"
          category="Announcements"
          categoryId="DIC_kwDOLn1tss4Cez6n"
          mapping="og:title"
          reactionsEnabled="1"
          emitMetadata="0"
          theme={`${process.env.API_PATH}/comment.css`}
          inputPosition="top"
          lang="zh-CN"
          loading="lazy"
        />
      ) : null}
    </div>
  );
};

export default Comments;
