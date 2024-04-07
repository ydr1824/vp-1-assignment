import { HDate } from "@hebcal/core";
import { getZman } from "./func.js";
let days = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  7: "Shabbas",
};

let arrDates = {};
let dt = new HDate(new Date()).onOrBefore(0);
for (let i = 1; i <= 7; i++) {
  let data = getZman(dt);
  arrDates[days[i]] = {
    Date: dt.render(),
    sofZmanShma: data[0],
    sofZmanTfila: data[1],
  };
  dt = dt.next();
}
console.table(arrDates);
