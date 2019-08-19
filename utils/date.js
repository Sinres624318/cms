//date start
//输出自己的日期格
function dateString(x, code) {
    if (code == undefined) {
        return x.getFullYear() + "年" + (x.getMonth() + 1) + "月" + x.getDate() + "日";
    }
    return x.getFullYear() + code + (x.getMonth() + 1) + code + x.getDate();
}

//输出自己格式的时间
function timeString(x) {

    return x.getHours() + ":" + x.getMinutes();

}

//输出自己日期时间
function dateTimeString(x, code) {
    return dateString(x, code) + " " + timeString(x);
}
module.exports = dateTimeString;