##项目注意事项
> css样式
- 使用rem，即设计稿尺寸除以100
- 每个组建中，html都放在<div className='my-container'> 元素下
- 组建最外层样式名以自己组件名 .my-组件名 命令，使用less，其他样式全部放在这个样式中，避免样式全局污染
增加 captain 分支

### 商品详情页
不需要反问权限验证 游客和登录用户均可以访问
根据路由跳转路径的中的路由参数来确定当前要展示的商品 比如 /detail/:productId 
在组件挂载之后向服务端发送请求 并将商品 ID 发送至服务端 获取商品数据 并将商品数据保存至组件的状态中
#### 商品的字段
+ 商品 id id [Number]
+ 商品名称 productName [String]
+ 商品单价 productPrice [Number]
+ 商品已售数量 selledAmount [Number]
+ 商品上架时间 addTime  [Number]
+ 商品图片 pictures [Array] 
+ 商品描述 desc [Array]     [ url1, url2, url3 ]
+ 商品卖家 seller [String]
+ 商品型号 typeModel [Array]  比如 [ { type: "红色", hasSelected: false },  { type: "绿色", hasSelected: false }  ] 
+ 商品库存 inventory [Number]
+ 卖家地址 sellerAddress [String]
+ 卖家好评率 commentRate [Number] 50-100 之间的整数

### 用户购物车页
需要访问权限验证 未登录用户没有购物车 购物车是一个数组
底部结算栏 对所有选中的商品进行价格统计
####　购物车中的每一个商品需要的字段
+ 商品名称 productName [String]
+ 商品型号 type [String]
+ 购买数量 quantity [Number] default 1
+ 小计 subtotal [Number] quantity * productPrice

测试用例

王梦雅测试用例