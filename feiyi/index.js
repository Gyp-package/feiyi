// 锚点
// let s1 = document.getElementById("#section - 1")
// let s2 = document.getElementById("#section - 2")
// let s3 = document.getElementById("#section - 3")
// let s4 = document.getElementById("#section - 4")
// let s5 = document.getElementById("#section - 5")
$('#se1').on('click', () => {
    $('html,body').animate({
        scrollTop: $('#section-1').offset().top
    }, 500)
})

$('#se2').on('click', () => {
    $('html,body').animate({
        scrollTop: $('#section-2').offset().top
    }, 500)
})

$('#se3').on('click', () => {
    $('html,body').animate({
        scrollTop: $('#section-3').offset().top
    }, 500)
})
$('#se4').on('click', () => {
    $('html,body').animate({
        scrollTop: $('#section-4').offset().top
    }, 500)
})
$('#se5').on('click', () => {
        $('html,body').animate({
            scrollTop: $('#section-5').offset().top
        }, 500)
    })
    // 时间
    // console.log(getNowTime());
    //获取当前时间
function getNowTime() {
    var date = new Date();
    //年 getFullYear()：四位数字返回年份
    var year = date.getFullYear(); //getFullYear()代替getYear()
    //月 getMonth()：0 ~ 11
    var month = date.getMonth() + 1;
    //日 getDate()：(1 ~ 31)
    var day = date.getDate();
    //时 getHours()：(0 ~ 23)
    var hour = date.getHours();
    //分 getMinutes()： (0 ~ 59)
    var minute = date.getMinutes();
    //秒 getSeconds()：(0 ~ 59)
    var second = date.getSeconds();
    var time = '' + year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
    return time;
}
//小于10的拼接上0字符串
function addZero(s) {
    return s < 10 ? ('0' + s) : s;
}

var rr = new Vue({
    el: "#rr",
    data: {
        message: getNowTime(),
    },
})