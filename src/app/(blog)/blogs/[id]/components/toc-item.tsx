import { TOCItem } from "@/app/(admin)/admin/posts/new/atom";
import React, { FC } from "react";
export interface TocItemProps {
  item: TOCItem;
}
const TocItem: FC<TocItemProps> = ({ item }) => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const distanceFromTop =
        element.getBoundingClientRect().top + window.scrollY;

      // 滚动到元素位置
      window.scrollTo({
        top: distanceFromTop - 100,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      // href={`#${item.id}`}
      onClick={() => {
        scrollToElement(item.id);
      }}
      className="mb-2 hover:underline cursor-pointer"
      style={{
        marginLeft: (item.level - 1) * 10,
      }}
    >
      {item.text}
    </div>
  );
};

export default TocItem;
