export default function upMore(element, callback,is) {
    if(is){
        let timerId;
        element.addEventListener( 'scroll', function () {


            if (timerId) clearTimeout(timerId);

            timerId = setTimeout(function () {

                let scrollTop = element.scrollTop;//向上卷去的高度

                let clientHeight = element.clientHeight;//可视区高度

                let scrollHeight = element.scrollHeight;//内容高度


                if (scrollTop + clientHeight + 10  >= scrollHeight) {

                    callback();
                }
            }, 100)

        })
    }
}