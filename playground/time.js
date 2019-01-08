// Jan 1st 1970 00:00:00 am
const moment = require("moment");

var date = new moment();
// date.add(10, "year").subtract(9, "months");
// console.log(date.format("MMM Do, YYYY "));
// console.log(date.format("h:mm a"));

var timeStamp = moment().valueOf();
console.log(timeStamp);


