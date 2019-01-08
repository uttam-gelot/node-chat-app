const moment = require("moment");

var generateMessage = (from, text) =>
{
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};
var generateLocationMessage = (from, latitude, longitude) =>
{
    var obj = 
    {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
    return obj;
};
module.exports = {generateMessage, generateLocationMessage};