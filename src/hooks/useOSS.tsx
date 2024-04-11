import { useRequest } from "ahooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
export interface PolicyData {
  policy: string;
  signature: string;
  accessId: string;
  host: string;
  dir: string;
}
async function getToken() {
  return fetch("/api/file/upload").then((res) => res.json());
}
export default function useOssSignature() {
  const [ossSignature, setOssSignature] = useState<PolicyData>();

  const { run } = useRequest(() => getToken(), {
    manual: true,
    onSuccess: (data: PolicyData) => {
      localStorage.setItem("ossSignature", JSON.stringify(data));
      setOssSignature(data);
    },
  });

  useEffect(() => {
    const localString = localStorage.getItem("ossSignature");
    // localstorege存的，用來判斷是否失效
    const localOssSignature = localString ? JSON.parse(localString ?? "") : {};
    if (!localOssSignature) {
      run();
      return;
    }
    if (!ossSignature) {
      setOssSignature(localOssSignature);
    }
  }, []);

  return ossSignature;
}
