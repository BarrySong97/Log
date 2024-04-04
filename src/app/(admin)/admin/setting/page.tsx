import React, { FC } from "react";
export interface SettingProps {}
const Setting: FC<SettingProps> = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold leading-9 text-default-foreground">
        设置
      </h1>
    </div>
  );
};

export default Setting;
