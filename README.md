## 描述
> 摩托商城是学习react时期写的一个项目。主要实现的功能:
>首页：关于摩托新闻的资讯页。实现了轮播图、新闻列表的下拉刷新和上拉分页加载功能，而且我们也加上了动画。
>商城页：摩托商品列表。同样实现了上拉分页加载功能和动画。并且该页可以对商品进行搜索，排序等功能。
>商品详情：每一件摩托商品的详情页。实现了轮播图，商品加入购物车，选择分类，检测登录态等功能
>购物车：用户加入购物车中的商品会在这里显示。实现了对商品的增删改的功能，可以进行全选和反选，并且选择商品，总价同时变化。
>个人中心：验证登录态，从后台获取个人信息，对个人信息的增删改等功能。
>登录和注册：实现了对注册账号时的本地验证功能，如手机号、密码等

### 主要技术栈：
- react
- react-router
- react-swipe
- node.js
- express

## 如何运行

- 下载项目
```
git clone `https://github.com/shanlisi/Motorcycle.git
```
- 进入项目文件夹，安装依赖
```
npm install
```
- 进入server目录，启动sever服务，即运行server.js

- 在项目跟文件下，启动前端开发服务：
```
npm run dev
```
### 项目效果图
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/1.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/2.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/3-1.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/3.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/4.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/5.png)
![Image text](https://raw.githubusercontent.com/shanlisi/Motorcycle/master/Motorcycle%20Screenshots/6.png)


### 后台接口
#### 1.获取首页轮播图
```
地址:/home/swipers
类型:GET
返回结果：
{
    code:0/1 //0:成功 1:失败[Number]
    swipers:[
        {
        title:'标题',[String]
        image:'图片地址',[String]
        url:'跳转路径',[String]
        }
    ...]
}
```
#### 2.获取首页列表
```
地址:/home/articleList?offset=0&limit=10
    offset:获取数据数组的起始量，默认0
    limit:每次获取数据的数量，默认10
类型:GET
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    hsaMore:true/false,//是否有更多数据[Boolean]
    articleList:[
        {
        title:'标题',[String]
        image:'图片地址',[String]
        url:'跳转路径',[String]
        date:'发布时间',[String]
        num:'评价数量',[String]
        flag:'分类',[String]
        }
    ...]
}
```
#### 3.获取商品列表
```
地址:/productList/getList?offset=0&limit=10
    offset:获取数据数组的起始量，默认0
    limit:每次获取数据的数量，默认5
类型:GET
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    hsaMore:true/false,//是否有更多数据[Boolean]
    productList:[
        {
        id:'商品id',[Number]
        title:'标题',[String]
        image:'图片地址',[String]
        date:'上架时间',[String]
        price:'价格',[Number]
        hot:'热度',[Number]
        }
    ...]
}
```
#### 4.筛选商品列表
```
地址:/productList/filterList?value=本田
    value:'用户的检索字段'
    注意：value值不要加引号
类型:GET
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    productList:[
        {
        id:'商品id',[Number]
        title:'标题',[String]
        image:'图片地址',[String]
        date:'上架时间',[String]
        price:'价格',[Number]
        hot:'热度',[Number]
        }
    ...]
}
```
#### 5.获取商品详情
```
地址:/productDetail/productId
    productId:数字，表示商品id
类型:GET
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    product:
        {
        name:'商品名',[String]
        price:'单价',[Number]
        soldNum:'已售数量',[Number]
        date:'上架时间',[String]
        inventory:'库存',[Number]
        seller:{
            name:'商家名',[String]
            location:'所在地',[String]
            favorableRate:'好评率'[String]
            }
        
        typeModel:{
           color:['亮蓝色',...]颜色[Array]
        },
        swiperImages:['localhost...',...]轮播图照片[Array]
        descImages:['localhost...',...]详情照片[Array]
        }
}
```
#### 6.获取用户购物车信息
```
地址:/shoppingCart/userId
    userId:用户ID ，数字
类型:GET

返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    login:'用户是否登录',[Boolean]
    cartInfo:[{
        id:'商品id',[Number]
        image:'商品图片地址'[String]
        name:'商品名',[String]
        price:'商品价格',[Number]
        num:'商品数量',[Number]
        typeModel:'商品型号类别'[String]
    },...]
}
```

#### 7.加入购物车
```
地址:/shoppingCart
类型:POST
请求体参数:{
    userId:'用户id',[Number]
    cartInfo:{
        productId:'商品id',[Number]
        name:'商品名',[String]
        price:'商品价格',[Number]
        num:'商品数量',[Number]
        typeModel:'颜色+型号'[String]
    }
}
返回结果：返回添加后用户购物车列表
{
    code:0/1, //0:成功 1:失败[Number]
    login:'用户是否登录',[Boolean]
    cartInfo:[{
        productId:'商品id',[Number]
        image:'商品图片地址'[String]
        name:'商品名',[String]
        price:'商品价格',[Number]
        num:'商品数量',[Number]
        typeModel:'颜色+型号'[String]
    },...]
}
```
#### 8.删除购物车中某一件商品
```
地址:/shoppingCart
类型DELETE
请求体参数:{
    userId:'用户id',[Number]
    cartInfo:{
        productId:'商品id',[Number]
        typeModel:'颜色+类型'[String]
    }
}
返回结果：删除后的用户购物车列表
{
    code:0/1, //0:成功 1:失败[Number]
    login:'用户是否登录',[Boolean]
    cartInfo:[{
        productId:'商品id',[Number]
        image:'商品图片地址'[String]
        name:'商品名',[String]
        price:'商品价格',[Number]
        num:'商品数量',[Number]
        typeModel:'颜色+型号'[String]
    },...]
}
```
#### 9.修改购物车商品数量
```
地址:/shoppingCart
类型PUT
请求体参数:{
  userId:'用户id',[Number]
  cartInfo:{
      productId:'商品id',[Number]
      typeModel:'颜色+类型'[String]
      num:商品数量
  }
}
返回结果：修改后的用户购物车列表
{
    code:0/1, //0:成功 1:失败[Number]
    login:'用户是否登录',[Boolean]
    cartInfo:[{
        productId:'商品id',[Number]
        image:'商品图片地址'[String]
        name:'商品名',[String]
        price:'商品价格',[Number]
        num:'商品数量',[Number]
        typeModel:'颜色+型号'[String]
    },...]
}
```
#### 10.获取用户信息
```
地址:/user/userId
    userId:用户ID ，数字
类型:GET

返回结果：用户信息
{
    code:0/1, //0:成功 1:失败[Number]
    login:true/false'是否登录'[Boolean]
    userInfo{
        userId:'用户id',[Number]
        userName:'用户名',[String]
        phone:'手机号',[Number]
        sex:'性别',[String]
        mail:'邮箱',[String]
        desc:'简介',[String]
        address:'地址',[Array]
        orderForms:'订单',[Array]
    }
}
```

#### 11.修改用户信息
```
地址:/user
类型:PUT
请求体参数:{
      userId:'用户id',[Number]【必填】
      userName:'用户名',[String]【从这以下选填】
      phone:'手机号',[Number]
      sex:'性别',[String]
      mail:'邮箱',[String]
      desc:'简介',[String]
      address:'地址',[Array]
      orderForms:'订单',[Array]
}
返回结果：新的用户信息
{
    code:0/1, //0:成功 1:失败[Number]
    login:'是否登录'false,[Boolean]
    {
        userId:'用户id',[Number]
        userName:'用户名',[String]
        phone:'手机号',[Number]
        sex:'性别',[String]
        mail:'邮箱',[String]
        desc:'简介',[String]
        address:'地址',[Array]
        orderForms:'订单',[Array]
    }
}
```

#### 11(新增)
地址:/logout
类型:GET
发送该请求退出登录态

#### 12.注册
```
地址:/signUp
类型POST
请求体参数:{
    userName:'用户名',[String]
    password:'密码'[String]
    phone:'手机号',[Number]
}
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    success:'注册成功',[String]
    error:'注册失败，用户名重复'[String]
}
```
#### 13.登录
```
地址:/login
类型POST
请求体参数:{
    userName:'用户名',[String]
    password:'密码'[String]
}
返回结果：
{
    code:0/1, //0:成功 1:失败[Number]
    success:'登录成功',[String]
    userId:'用户id',[Number]
    error:'登录失败，用户名或密码错误'[String]
}
```
