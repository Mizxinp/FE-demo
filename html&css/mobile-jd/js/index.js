window.onload = function () {
    headScroll();
    seckilling()
    banner();
}

/* 头部滚动时颜色效果 */
function headScroll() {

    var head = document.querySelector('.header-content');

    // rgba(201,21,35,0.85)
    var banner = document.querySelector('#ad');
    var height = banner.offsetHeight;
    // console.log(height);
    window.onscroll = function () {
        var top = document.body.scrollTop;
        console.log(top);
        var rate = top / height * 0.85

        if (top > height) {
            head.style.background = 'rgba(201,21,35,0.85)';
        } else {
            head.style.background = 'rgba(201,21,35,' + rate + ')';
        }
    }
}

/* 秒杀倒计时 */
function seckilling() {
    var seckilling = document.querySelectorAll('.count-down');
    console.log(seckilling.length)
    //设置倒计时时间
    var time = 3 * 60 * 60;
    var timer;
    timer = setInterval(function () {
        time--;
        // 计算时分秒
        var hours = Math.floor(time / 60 / 60);
        var minutes = Math.floor(time / 60 % 60);
        var seconds = Math.floor(time % 60);
        // 写入页面中
        seckilling[0].innerHTML = hours > 10 ? Math.floor(hours / 10) : 0;
        seckilling[1].innerHTML = hours % 10;
        seckilling[2].innerHTML = minutes > 10 ? Math.floor(minutes / 10) : 0;
        seckilling[3].innerHTML = minutes % 10;
        seckilling[4].innerHTML = seconds > 10 ? Math.floor(seconds / 10) : 0;
        seckilling[5].innerHTML = seconds % 10;

        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000)
}

/* 轮播图效果 */

//功能: 1 自动无缝轮播 --用定时器
//      2 下面的点跟着轮播图 --用索引index
//      3 手的滑动效果
//      4 滑动的距离小于1/3时的吸附效果
//      5 滑动的距离大于1/3时的切换上一张，下一张效果

var banner = function () {
    //获取元素
    var banner = document.querySelector('#ad');
    var imgBox = banner.querySelector('.imgs');
    var circleBox = banner.querySelector('.circle');
    var everyCircle = circleBox.querySelectorAll('li');

    //获取屏幕宽度
    var screenWidth = banner.offsetWidth;
    // console.log(screenWidth)

    //封装重复用到的过渡和位移
    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s'
        imgBox.style.webkitTransition = 'all 0.2s'
    }
    var removeTransition = function () {
        imgBox.style.transition = 'none'
        imgBox.style.webkitTransition = 'none'
    }
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX(' + translateX + 'px)' //注意别忘了加px
        imgBox.style.webkitTransform = 'translateX(' + translateX + 'px)'
    }

    //1自动无缝轮播
    var index = 1;
    var timer = setInterval(function () {
        index++;
        //过渡
        addTransition();
        //位移
        // console.log(-index * screenWidth)
        setTranslateX(-index * screenWidth);
    }, 2000)
    //当轮播到最后一张时去做判断，然后回到第一张
    imgBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
            //清过渡
            removeTransition();
            //在做位移
            setTranslateX(-index * screenWidth);
        }
        else if (index <= 0) {
            index = 8;
            //清过渡
            removeTransition();
            //在做位移
            setTranslateX(-index * screenWidth);
        }
        setCircle()
    })

    // 2 设置底下的小圈跟着动
    var setCircle = function () {
        //清除所有
        for (var i = 0; i < everyCircle.length; i++) {
            everyCircle[i].classList.remove('now')
        }
        // console.log(index)
        everyCircle[index - 1].classList.add('now')
    }

    // 3 手的滑动效果

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart', function (e) {
        //先清除一下定时器
        clearInterval(timer);
        // console.log(e.touches)
        //触摸的起始坐标
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener('touchmove', function (e) {
        // console.log(e.touches)
        //滑动过程的坐标
        var moveX = e.touches[0].clientX;
        //滑动了多少
        distanceX = moveX - startX;
        //元素具体定位
        var translateX = -index * screenWidth + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });

    //4 5 吸附和切换
    imgBox.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) < screenWidth / 3) {
                //吸附
                addTransition();
                setTranslateX(-index * screenWidth);
            } else {
                //切换
                if (distanceX > 0) {
                    index--;
                }
                else {
                    index++;
                }
                addTransition();
                setTranslateX(-index * screenWidth);
            }
        }
        //做重置
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //加过渡
            addTransition();
            //做位移
            setTranslateX(-index * screenWidth);
        }, 2000);
    });
}