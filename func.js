import { HDate, Location, GeoLocation, Zmanim } from "@hebcal/core";

export function getZman(dt) {
  let a = new Zmanim(Location.lookup("New York"), dt);
  let sofZmanShmaMga = timeAgo(a.sofZmanShmaMGA());
  let sofZmanTfilaMga = timeAgo(a.sofZmanTfillaMGA());
  return [sofZmanShmaMga, sofZmanTfilaMga];
}

function UTCtoLocalTime(utcDateTime) {
  let localDate = new Date(utcDateTime);
  let hours = localDate.getHours() % 12 || 12;
  let minutes = localDate.getMinutes();
  let amOrPm = localDate.getHours() >= 12 ? "pm" : "am";
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
}

function timeAgo(time) {
  const ptime = new Date(time);
  let formatted_ptime = ptime.toDateString();
  let formatted_cTime = new Date().toDateString();
  if (!(formatted_cTime == formatted_ptime)) return UTCtoLocalTime(time);
  const comparingTime = ptime.getTime();
  const currentTime = Date.now();
  const diff = Math.floor((comparingTime - currentTime) / 1000 / 60);
  if (diff === 0) {
    return "just now";
  } else if (diff < 0) {
    return `${minutesToHour(diff)} ago`;
  } else {
    return `in ${minutesToHour(diff)}`;
  }
}

function minutesToHour(str) {
  const diff = Math.abs(str);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  let H = hours ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
  let M = minutes
    ? `${hours ? " and " : ""}${minutes} Minute${minutes > 1 ? "s" : ""}`
    : "";
  return `${H}${M}`;
}
