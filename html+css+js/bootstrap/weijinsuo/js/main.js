/*
* @Author: Mizxinp
* @Date:   2018-02-09 14:13:53
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-03 16:23:37
*/
$(function () {
    function adaptScreen() {
        //拿到窗口宽度
        var windowWidth = $(window).width();
        //判断是不是小图片
        var isSmallScreen = windowWidth < 768;
        $('#main_ad > .carousel-inner > .item').each(function (index, element) {
            //这里要注意，拿到的是dom对象，要转换成jq对象
            $element = $(element);
            //得到图片的路径
            var imgSrc = isSmallScreen ? $element.data('small-image') : $element.data('large-image');
            //设置样式（之前一直没有图片出现，原因是设置样式时写成了$element.css("backgroundImage",imgSrc;
            $element.css("backgroundImage", 'url("' + imgSrc + '")');
            // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
            if (isSmallScreen) {
                $element.html('<img src="' + imgSrc + '" alt="" />');
            } else {
                $element.empty();
            }
        });
    }

    //当调整浏览器窗口的大小时，发生 resize 事件,未调整先让它出发一次
    //$(window).on('resize', adaptScreen).trigger('adaptScreen');
    adaptScreen();

    $(window).on('resize', adaptScreen);

    //特色推荐部分小工具提示初始化
    $('[data-toggle="tooltip"]').tooltip()

    /* 横向滚动条 */
    //获取元素
    var $elem = $('.nav-tabs')
    //获取宽度
    var width = 30;
    $elem.children().each(function (index, element) {
        width += element.clientWidth;
    })
    /* 这样写窗口变大后也会有滚动条*/
    //$elem.css('width',width) 

    //优化
    if (width > $(window).width()) {
        $elem.css('width', width).parent().css('overflow-x', 'scroll');
    }
    //

    //新闻部分点击li相应的标题做出更改
    var $newsTitle = $('.title a');
    $newsTitle.on('click', function () {
        var $this = $(this)
        var title = $this.data('news-title');
        $('.news-title').text(title);
    })

    /* 移动端轮播图的左滑又滑功能 */
    var $carousel = $('.carousel');
    var startX, endX;
    var offset = 50; //在一定的范围内不滑动
    //获取一下方向,触碰屏幕时的位置
    $carousel.on('touchstart', function (e) {
        //console.log(e.originalEvent.touches[0])
        startX = e.originalEvent.touches[0].clientX;
    })
    $carousel.on('touchmove', function (e) {
        // console.log(e.originalEvent.touches[0].clientX)
        endX = e.originalEvent.touches[0].clientX;
    })
    $carousel.on('touchend', function () {
        if (offset < Math.abs(startX - endX)) {
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }

    })
    //触发向左向右
})
