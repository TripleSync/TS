export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // 초 단위 차이
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "오전" : "오후";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  if (diff < 60) {
    return "방금 전";
  }

  if (diff < 360) {
    const minutesAgo = Math.floor(diff / 60);
    return `${minutesAgo}분 전`;
  }

  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return `${period} ${formattedHours}:${formattedMinutes}`;
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${period} ${formattedHours}:${formattedMinutes}`;
}
