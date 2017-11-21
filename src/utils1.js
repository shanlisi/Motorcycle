/*
* 上拉加载，传递两个参数，
* 第一个参数是dom，dom是最外层的容器，=>my-container
* 第二个参数是callback，用途是发ajax请求新的数据，
*
* */
function getScroll(dom,callback) {
    let childrenHeight=dom.firstElementChild.scrollHeight,
        contClientHeight=dom.clientHeight,
        currenrScroll='';
    let timer;
    dom.addEventListener('scroll',function () {
        if(timer)clearInterval(timer);
        timer = window.setTimeout(function () {
            currenrScroll=dom.scrollTop;
            if(parseFloat(contClientHeight)+currenrScroll+30>=parseFloat(childrenHeight)){
                callback();
            }
        },100)
    });
}