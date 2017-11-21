//获取访问静态资源服务器的域名
let {prefix} = require('./prefix');

//商品列表数据
let productList = [
    {
        id: 1,
        title: '新大洲本田CBF190R',
        image: prefix + 'images/productList/list-id-1.jpg',
        date: '2017/06/12',
        price: 14800,
        hot: 432
    },
    {
        id: 2,
        title: '力帆乐E',
        image: prefix + 'images/productList/list-id-2.jpg',
        date: '2017/08/22',
        price: 4980,
        hot: 20
    },
    {
        id: 3,
        title: '豪爵铃木GW250',
        image: prefix + 'images/productList/list-id-3.jpg',
        date: '2015/11/14',
        price: 23880,
        hot: 160
    },
    {
        id: 4,
        title: '银钢 大MINI TW55 ',
        image: prefix + 'images/productList/list-id-4.jpg',
        date: '2015/05/12',
        price: 7980,
        hot: 9
    },
    {
        id: 5,
        title: '宗申赛科龙RX1',
        image: prefix + 'images/productList/list-id-5.jpg',
        date: '2017/09/30',
        price: 11100,
        hot: 10
    },
    {
        id: 6,
        title: '新大洲本田自由TODAY',
        image: prefix + 'images/productList/list-id-6.jpg',
        date: '2015/07/03',
        price: 5980,
        hot: 3418
    },
    {
        id: 7,
        title: '新大洲本田裂行RX125',
        image: prefix + 'images/productList/list-id-7.jpg',
        date: '2017/06/05',
        price: 9980,
        hot: 55
    },
    {
        id: 8,
        title: '新大洲本田焰影SDH150-16',
        image: prefix + 'images/productList/list-id-8.jpg',
        date: '2016/04/14',
        price: 9980,
        hot: 24
    },
    {
        id: 9,
        title: '启典KD150-H',
        image: prefix + 'images/productList/list-id-9.jpg',
        date: '2017/08/24',
        price: 6799,
        hot: 18
    },
    {
        id: 10,
        title: '新大洲本田CBF190X ',
        image: prefix + 'images/productList/list-id-10.jpg',
        date: '2016/12/07',
        price: 14980,
        hot: 240
    }
];

//商品详情数据
let products = [
    {
        id: 1,
        name: '新大洲本田CBF190R',
        date: '2017/06/12',
        price: 14800,
        soldNum: 432,
        inventory: 426,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['白色', '黑色', '红色']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-1-1.png', prefix + 'images/productInfo/swipers/swiper-id-1-2.png', prefix + 'images/productInfo/swipers/swiper-id-1-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-1-1.jpg',prefix + 'images/productInfo/details/detail-id-1-2.jpg',prefix + 'images/productInfo/details/detail-id-1-3.jpg']
    },
    {
        id: 2,
        name: '力帆乐E',
        date: '2017/08/22',
        price: 4980,
        soldNum: 20,
        inventory: 523,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['白色', '黄色', '绿色']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-2-1.png', prefix + 'images/productInfo/swipers/swiper-id-2-2.png', prefix + 'images/productInfo/swipers/swiper-id-2-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-2-1.jpg',prefix + 'images/productInfo/details/detail-id-2-2.jpg',prefix + 'images/productInfo/details/detail-id-2-3.jpg',prefix + 'images/productInfo/details/detail-id-2-4.jpg',prefix + 'images/productInfo/details/detail-id-2-5.jpg',prefix + 'images/productInfo/details/detail-id-2-6.jpg',prefix + 'images/productInfo/details/detail-id-2-7.jpg',prefix + 'images/productInfo/details/detail-id-2-8.jpg']
    },
    {
        id: 3,
        name: '豪爵铃木GW250',
        date: '2015/11/14',
        price: 23880,
        soldNum: 160,
        inventory: 996,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['星光黑', '透明红', '冰川白']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-3-1.png', prefix + 'images/productInfo/swipers/swiper-id-3-2.png', prefix + 'images/productInfo/swipers/swiper-id-3-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-3-1.jpg',prefix + 'images/productInfo/details/detail-id-3-2.jpg',prefix + 'images/productInfo/details/detail-id-3-3.jpg',prefix + 'images/productInfo/details/detail-id-3-4.jpg',prefix + 'images/productInfo/details/detail-id-3-5.jpg',prefix + 'images/productInfo/details/detail-id-3-6.jpg',prefix + 'images/productInfo/details/detail-id-3-7.jpg']
    },
    {
        id: 4,
        name: '银钢 大MINI TW55 ',
        date: '2015/05/12',
        price: 7980,
        soldNum: 9,
        inventory: 112,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['白色', '黑色', '红色', '蓝色', '黄色']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-4-1.png', prefix + 'images/productInfo/swipers/swiper-id-4-2.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-4-1.jpg',prefix + 'images/productInfo/details/detail-id-4-2.jpg']
    },
    {
        id: 5,
        name: '宗申赛科龙RX1',
        date: '2017/09/30',
        price: 11100,
        soldNum: 10,
        inventory: 322,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['蓝色', '黑色', '黄色']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-5-1.png', prefix + 'images/productInfo/swipers/swiper-id-5-2.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-5-1.jpg',prefix + 'images/productInfo/details/detail-id-5-2.jpg',prefix + 'images/productInfo/details/detail-id-5-3.jpg']
    },
    {
        id: 6,
        name: '新大洲本田自由TODAY',
        date: '2015/07/03',
        price: 5980,
        soldNum: 3418,
        inventory: 8699,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['玫瑰红','欧洲黄','珍珠黑','大鲨白']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-6-1.png', prefix + 'images/productInfo/swipers/swiper-id-6-2.png', prefix + 'images/productInfo/swipers/swiper-id-6-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-6-1.jpg']
    },
    {
        id: 7,
        name: '新大洲本田裂行RX125',
        date: '2017/06/05',
        price: 9980,
        soldNum: 55,
        inventory: 2345,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['黑灰', '白色', '银光红']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-7-1.png', prefix + 'images/productInfo/swipers/swiper-id-7-2.png', prefix + 'images/productInfo/swipers/swiper-id-7-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-7-1.jpg',prefix + 'images/productInfo/details/detail-id-7-2.jpg',prefix + 'images/productInfo/details/detail-id-7-3.jpg',prefix + 'images/productInfo/details/detail-id-7-4.jpg',prefix + 'images/productInfo/details/detail-id-7-5.jpg',prefix + 'images/productInfo/details/detail-id-7-6.jpg',prefix + 'images/productInfo/details/detail-id-7-7.jpg']
    },
    {
        id: 8,
        name: '新大洲本田焰影SDH150-16',
        date: '2016/04/14',
        price: 9980,
        soldNum: 24,
        inventory: 76,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: [ '黑色', '棕色']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-8-1.png', prefix + 'images/productInfo/swipers/swiper-id-8-2.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-8-1.jpg',prefix + 'images/productInfo/details/detail-id-8-2.jpg']
    },
    {
        id: 9,
        name: '启典KD150-H',
        date: '2017/08/24',
        price: 6799,
        soldNum: 18,
        inventory: 265,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['珍珠白', '橙色', '亮蓝']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-9-1.png', prefix + 'images/productInfo/swipers/swiper-id-9-2.png', prefix + 'images/productInfo/swipers/swiper-id-9-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-9-1.jpg',prefix + 'images/productInfo/details/detail-id-9-2.jpg',prefix + 'images/productInfo/details/detail-id-9-3.jpg',prefix + 'images/productInfo/details/detail-id-9-4.jpg',prefix + 'images/productInfo/details/detail-id-9-5.jpg',prefix + 'images/productInfo/details/detail-id-9-6.jpg']
    },
    {
        id: 10,
        name: '新大洲本田CBF190X ',
        date: '2016/12/07',
        price: 14980,
        soldNum: 240,
        inventory: 760,
        seller: {
            name: '官方旗舰店',
            location: '北京市昌平区育知路36号',
            favorableRate: '95%'
        },

        typeModel: {
            color: ['珍珠白', '银光红', '灰黑']
        },
        swiperImages: [prefix + 'images/productInfo/swipers/swiper-id-10-1.png', prefix + 'images/productInfo/swipers/swiper-id-10-2.png', prefix + 'images/productInfo/swipers/swiper-id-10-3.png'],
        descImages: [prefix + 'images/productInfo/details/detail-id-10-1.jpg',prefix + 'images/productInfo/details/detail-id-10-2.jpg',prefix + 'images/productInfo/details/detail-id-10-3.jpg',prefix + 'images/productInfo/details/detail-id-10-4.jpg',prefix + 'images/productInfo/details/detail-id-10-5.jpg',prefix + 'images/productInfo/details/detail-id-10-6.jpg',prefix + 'images/productInfo/details/detail-id-10-7.jpg',prefix + 'images/productInfo/details/detail-id-10-8.jpg',prefix + 'images/productInfo/details/detail-id-10-9.jpg']
    }
];


module.exports = {productList,products};