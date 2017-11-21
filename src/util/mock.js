import Mock from "mockjs";

/**
 * 使用 mock.js 模拟商品详情页需要的商品详情的数据字段
 * 具体使用请见 https://github.com/nuysoft/Mock/wiki
 */
export default Mock.mock( "http://g.cn", {   
    "id": "@integer(1)",
    "productName": "@name",
    'productPrice|3000-30000': 1.12,
    "selledAmount|1-100": 1,
    "addTime": "@date('yyyy年MM月dd日')",
    "pictures": "@image('320x200')",
    "desc|5-8": [ "@image( '320x200' )" ],
    "seller": "@name",
    "typeModel|3-5": [ { "type": "@word", "hasSelected": false }  ],
    "inventory|1-100": 1,
    "sellerAddress": "@province@city@county",
    "commentRate|50-100": 1
})