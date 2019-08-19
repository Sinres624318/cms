const getCookie = function (req, key) {
    var cookies = req.headers.cookie;
    console.log(cookies);
    var cookieArr = cookies.split('; ');
    for (let i = 0; i < cookieArr.length; i++) {
        var arr = cookieArr[i].split('=');
        if(arr[0] == key){
            return arr[1];
        }
    }
};

module.exports = {
    getCookie
};