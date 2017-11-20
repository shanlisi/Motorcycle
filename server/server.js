let express =require('express');
let app=express();
let port=3000;
let bodyParser =require('body-parser');
let cookieParser=require('cookie-parser');

//home 数据
let {swipers,articleList} =require('./mock/home');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));
app.use('/public',express.static('static'));
app.use(cookieParser());


app.get('/home/swipers',function (req, res) {
    res.json({code:0,swipers})
});

app.get('/home/articleList',function (req, res) {
    let offset=+req.query.offset||0;
    let limit=+req.query.limit||10;
    let hsaMore=true;
    console.log(offset+limit,articleList.length);
    if(offset+limit>=articleList.length){
        hsaMore=false;
    }
    let list=articleList.slice(offset,offset+limit);

    res.json({code:0,articleList:list,hasMore:hsaMore})
});




app.listen(port,function () {
    console.log(`正在监听${port}端口`);
});