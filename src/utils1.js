/*
* 上拉加载，传递两个参数，
* 第一个参数是dom，dom是最外层的容器，=>my-container
* 第二个参数是callback，用途是发ajax请求新的数据，
*
* */
export  default  function getScroll(dom,callback,is) {
    if(is){
        let childrenHeight=dom.firstElementChild.scrollHeight,
            contClientHeight=dom.clientHeight,
            currenrScroll='';
        let timer;
        function fn() {
            if(timer)clearInterval(timer);
            timer = window.setTimeout(function () {
                currenrScroll=dom.scrollTop;
                childrenHeight=dom.scrollHeight;
                if(parseFloat(contClientHeight)+currenrScroll+30 >= parseFloat(childrenHeight)){
                    childrenHeight=dom.firstElementChild.scrollHeight;
                    callback();
                }
            },100)
        }
        dom.addEventListener('scroll',fn);
    }else{
        console.log(dom.removeEventListener);
        dom.removeEventListener('scroll',fn);
    }
}
