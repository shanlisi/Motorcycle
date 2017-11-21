let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
//服务端口号
let port = 3000;
//允许前端跨域访问的域名
let {prefixOfWebpack} = require('./mock/prefix');

//得到首页的相关数据
let {swipers, articleList} = require('./mock/home');
//得到商品列表页的相关数据
let {productList, products} = require('./mock/products');

//跨域授权设置
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', prefixOfWebpack);
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method.toUpperCase() === "OPTIONS") {
        res.end()
    } else {
        next()
    }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));
app.use('/public', express.static('static'));
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'shanlisi',
    cookie:{
        httpOnly:false,
        maxAge:1800000
    }
}));

//首页轮播图
app.get('/home/swipers', function (req, res) {
    res.json({code: 0, swipers})
});
//首页列表
app.get('/home/articleList', function (req, res) {
    let offset = +req.query.offset || 0;
    let limit = +req.query.limit || 10;
    if (offset > articleList.length) {
        res.json({code: 1, error: '获取数据的起始量(offset)超出范围'});
        return;
    }
    let hsaMore = true;
    if (offset + limit >= articleList.length) {
        hsaMore = false;
    }
    let list = articleList.slice(offset, offset + limit);

    res.json({code: 0, articleList: list, hasMore: hsaMore})
});

//商品列表
app.get('/productList/getList', function (req, res) {
    let offset = +req.query.offset || 0;
    let limit = +req.query.limit || 5;
    if (offset > productList.length) {
        res.json({code: 1, error: '获取数据的起始量(offset)超出范围'});
        return;
    }
    let hsaMore = true;
    if (offset + limit >= productList.length) {
        hsaMore = false;
    }
    let list = productList.slice(offset, offset + limit);
    res.json({code: 0, productList: list, hasMore: hsaMore})
});
//筛选商品列表
app.get('/productList/filterList', function (req, res) {
    let value = req.query.value;
    if (!value) {
        res.json({code: 1, error: '请按照规定请求数据，例.../productList/filterList?value=本田'});
        return;
    }
    let list = productList.filter(item => {
        return item.title.includes(value)
    });
    if (list.length === 0) {
        res.json({code: 1, error: '暂无相关内容'});
    } else {
        res.json({code: 0, productList: list})
    }

});

//商品详情
app.get('/productDetail/:id', function (req, res) {
    let id = req.params.id;
    if (isNaN(Number(id))) {
        res.json({code: 1, error: '参数ID必须是数字，例.../productDetail/1'});
        return;
    }
    if ((products[id - 1]) && (products[id - 1].id = id)) {
        res.json({code: 0, product: products[id - 1]})
    } else {
        let product = products.find(item => item.id == id);
        if (product) {
            res.json({code: 0, product: product})
        } else {
            res.json({code: 1, error: '未找到相关数据'});
        }
    }
});

//购物车查增删改
app.route('/shoppingCart').get(function (req, res) {

}).post(function (req, res) {

}).delete(function (req, res) {

}).put(function (req, res) {

});

//读取用户信息文件
function getUsersInfo(cb) {
    fs.readFile('./mock/usersInfo.json', 'utf8', function (err, data) {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data))
        }
    })
}

//修改用户信息文件
function modifyUserInfo(data, cb) {
    fs.writeFile('./mock/usersInfo.json', JSON.stringify(data), cb)
}


//获取用户信息
app.get('/user/:id', function (req, res) {
    if(!req.session.login){
        res.json({code:0,login:false,error:'用户未登录'});
        return
    }
    let userId = req.params.id;
    getUsersInfo(function (data) {
        let userInfo=data.find(item=>item.id==userId);
        if(userInfo){
            res.json({code:0,login:true,userInfo})
        }else{
            res.json({code:1,login:true,error:'未找到该用户信息，请检查用户id是否正确'})
        }
    })

});
//修改用户信息
app.put('/user', function (req, res) {
    if(!req.session.login){
        res.json({code:0,login:false,error:'用户未登录'});
        return
    }
    let reqBody = req.body;
    if(!reqBody.userId){
        res.json({code:1,login:true,error:'请在请求体内传递userId参数'});
        return;
    }

    getUsersInfo(function (data) {
        if (!data.some(item => item.id == reqBody.userId)) {
            res.json({code: 1, error: '用户ID不存在'});
            return;
        }
        data.forEach((item,index) => {
            if (item.id == reqBody.id) {
                let userInfo=data.splice(index,1)[0];
                userInfo={...userInfo,...reqBody};
                data.splice(index,0,userInfo);
                modifyUserInfo(data,function () {
                    res.json({code:0,login:true,userInfo})
                })
            }
        });
    });
});
app.get('/logout',function (req, res) {
    req.session.login=null;
    res.json({code:0,success:'已退出'})
})
//注册
app.post('/signup', function (req, res) {
    let {userName, password, phone = ''} = req.body;
    if (!userName || !password) {
        res.json({code: 1, error: 'userName和password必须上传'});
        return;
    }
    getUsersInfo(function (userInfo) {
        let flag = userInfo.some(item => (item.userName == userName
        ));
        if (flag) {
            res.json({code: 1, error: '该用户已经被注册了'})
        } else {
            let obj = {
                id: userInfo.length + 1,
                userName,
                password,
                phone,
                sex: 'man',
                mail: '',
                desc: '',
                address: [],
                orderForms: []
            };
            userInfo.push(obj);
            modifyUserInfo(userInfo, function () {
                res.json({code: 0, success: '注册成功'})
            })
        }
    })
});
//登录，设置一个session：login(true/false)
app.post('/login', function (req, res) {
    let {userName, password} = req.body;
    if (!userName || !password) {
        res.json({code: 1, error: '请按API文档规定请求'})
    }
    getUsersInfo(function (data) {
        let userInfo = data.find(item => (item.userName == userName && item.password == password
        ));
        if (userInfo) {
            req.session.login=true;
            res.json({code: 0, success: '登录成功',userId:userInfo.id})
        } else {
            res.json({code: 1, error: '登录失败，用户名或密码错误'})
        }
    })
});

app.listen(port, function () {
    console.log(`正在监听${port}端口`);
});