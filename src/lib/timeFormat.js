export default function timeFormat(timeString) {
  try {
    let today = new Date(timeString);

    let year = String(today.getFullYear()).slice(2); // 년도
    let month = String(today.getMonth() + 1).padStart(2, "0"); // 월
    let date = String(today.getDate()).padStart(2, "0"); // 날짜
    let hours = String(today.getHours());
    const unit = hours >= 12 ? "오후" : "오전";
    hours = (hours % 12).toString().padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");

    return `${year}.${month}.${date}. ${unit} ${hours}:${minutes}:${seconds}`;
  } catch {
    console.error("not valid time stirng");
    return null;
  }
}
