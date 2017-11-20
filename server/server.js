let express =require('express');
let app=express();
let port=3000;
let bodyParser =require('body-parser');
let cookieParser=require('cookie-parser');

//得到首页的相关数据
let {swipers,articleList} =require('./mock/home');
//得到商品列表页的相关数据
let {productList} =require('./mock/products');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));
app.use('/public',express.static('static'));
app.use(cookieParser());

//首页轮播图
app.get('/home/swipers',function (req, res) {
    res.json({code:0,swipers})
});
//首页列表
app.get('/home/articleList',function (req, res) {
    let offset=+req.query.offset||0;
    let limit=+req.query.limit||10;
    if(offset>articleList.length){
        res.json({code:1,error:'获取数据的起始量(offset)超出范围'});
        return;
    }
    let hsaMore=true;
    if(offset+limit>=articleList.length){
        hsaMore=false;
    }
    let list=articleList.slice(offset,offset+limit);

    res.json({code:0,articleList:list,hasMore:hsaMore})
});

//商品列表
app.get('/productList/getList',function (req, res) {
    let offset=+req.query.offset||0;
    let limit=+req.query.limit||5;
    if(offset>productList.length){
        res.json({code:1,error:'获取数据的起始量(offset)超出范围'});
        return;
    }
    let hsaMore=true;
    if(offset+limit>=productList.length){
        hsaMore=false;
    }
    let list=productList.slice(offset,offset+limit);
    res.json({code:0,productList:list,hasMore:hsaMore})
});
app.get('/productList/filterList',function (req, res) {
    let value=req.query.value.substr(1,req.query.value.length-2);
    console.log(value);
    if(!value){
        res.json({code:1,error:'暂无相关内容'});
        return;
    }
    let list=productList.filter(item=>{
        return item.title.includes(value)
    });
    res.json({code:0,productList:list})
});


app.listen(port,function () {
    console.log(`正在监听${port}端口`);
});