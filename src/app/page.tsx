import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { MaterialSymbolsAddLocation } from "./assets/icon";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link className="text-3xl font-bold" color="foreground" href="/">
            BarrySong
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl ">
        <div className="flex justify-between">
          <div className="self-center">
            <div className="mb-4">
              <div className="flex gap-1 items-center mb-2">
                <MaterialSymbolsAddLocation className="text-large" />
                <span className="text-small text-default-500">
                  贵州贵阳修文
                </span>
              </div>
              <div className="font-semibold ">
                正在远程的全栈偏前的软件工程师
              </div>
            </div>
            <div className="gap-4 flex items-center">
              <Button as={"a"} isIconOnly variant="light">
                <Image
                  src={"/xiaohongshu.ico"}
                  height={28}
                  width={28}
                  alt="xiaohongshu"
                />
              </Button>
              <Button as={"a"} isIconOnly variant="light">
                <Image
                  src={"/twitter.3.ico"}
                  className="rounded-lg"
                  height={28}
                  width={28}
                  alt="xiaohongshu"
                />
              </Button>
              <Button as={"a"} isIconOnly variant="light">
                <Image
                  src={"/weixin.ico"}
                  className="rounded-lg"
                  height={28}
                  width={28}
                  alt="xiaohongshu"
                />
              </Button>
            </div>
          </div>
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-2/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <div className="relative z-10">
              <Image
                src={"/blogger.jpg"}
                alt="avatar"
                className="object-cover rounded-full w-[400px] h-[400px] sm:w-[280px] sm:h-[280px]"
                height={100}
                width={300}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            文章
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            言之有物，行之有术
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            项目
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            见微知著,事半功倍
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            关于我
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            探索宇宙，永葆青春
          </p>
        </a>
      </div>
    </main>
  );
}
