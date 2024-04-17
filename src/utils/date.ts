import dayjs from "dayjs";

export function formatDateOrDaysAgo(dateString: string): string {
  // 使用 dayjs 来解析给定的日期字符串
  const dateToCheck = dayjs(dateString);

  // 获取当前日期
  const now = dayjs();

  // 计算给定日期和当前日期之间的天数差异
  const diffInDays = now.diff(dateToCheck, "day");

  // 根据天数差异决定输出格式
  if (diffInDays >= 60) {
    // 如果超过60天，显示格式化的日期
    return dateToCheck.format("YYYY-MM-DD");
  } else {
    // 如果没有超过60天，显示多少天前
    return `${diffInDays ? diffInDays : 1} 天前`;
  }
}
