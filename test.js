let  prefix='http://localhost:3000/public/';
let articleList=[
    {
        title:'最大马力210匹！机械增压旅行车川崎Ninja H2 SX，米兰车展发布',
        image:prefix+'images/article/article-1.jpg',
        url:'http://www.qishi8.cn/article-3934-1.html#ath',
        date:'2017/11/08',
        num:'897',
        flag:'车展资讯'
    },
    {
        title:'贝纳利发布2个全新双缸发动机平的750S',
        image:prefix+'images/article/article-2.jpg',
        url:'http://www.qishi8.cn/article-3933-1.html#ath',
        date:'2017/11/08',
        num:'1623',
        flag:'车展资讯'
    },{
        title:'米兰车展本田发3款CB系列车型：CB1000R、CB300R、CB125R',
        image:prefix+'images/article/article-3.jpg',
        url:'http://www.qishi8.cn/article-3932-1.html#ath',
        date:'2017/11/08',
        num:'1494',
        flag:'车展资讯'
    },{
        title:'感觉“性价比”爆棚的250 ADV，银钢铁拳250测评',
        image:prefix+'images/article/article-4.jpg',
        url:'http://www.qishi8.cn/article-3905-1.html#ath',
        date:'2017/08/31',
        num:'6587',
        flag:'试骑试驾'
    },{
        title:'铃木DL250探险旅行车，骑士网呆子测评',
        image:prefix+'images/article/article-5.jpg',
        url:'http://www.qishi8.cn/article-3883-1.html#ath',
        date:'2017/08/17',
        num:'5252',
        flag:'试骑试驾'
    },{
        title:'1万多欧元起售CRF450滑胎车，你会买单吗？',
        image:prefix+'images/article/article-6.jpg',
        url:'http://www.qishi8.cn/article-3625-1.html#ath',
        date:'2016/12/26',
        num:'2444',
        flag:'产品速递'
    },
];
for (var i = 0; i < 50; i++) {
    let num =Math.round(Math.random()*articleList.length);
    articleList.push(articleList[num])
}
console.log(articleList);