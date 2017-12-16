let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let session = require('express-session');
//服务端口号
let port = 3000;
//允许前端跨域访问的域名
let {prefixOfWebpack,prefix} = require('./mock/prefix');

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
    resave: true,
    saveUninitialized: true,
    secret: 'shanlisi',
    cookie: {
        httpOnly: false,
        maxAge: 1800000
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
    setTimeout(()=>{res.json({code: 0, articleList: list, hasMore: hsaMore})},500)
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
    setTimeout(()=>{res.json({code: 0, productList: list, hasMore: hsaMore})},500)
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
        res.json({code: 1, error: '参数ID必须上传且是数字，例.../productDetail/1'});
        return;
    }
    if ((products[id - 1]) && (products[id - 1].id = id)) {
        res.json({code: 0, product: products[id - 1]})
    } else {
        let product = products.find(item => item.userId == id);
        if (product) {
            res.json({code: 0, product: product})
        } else {
            res.json({code: 1, error: '未找到相关数据'});
        }
    }
});

//读取用户JSON文件
function getUsersInfo(cb) {
    fs.readFile('./mock/usersInfo.json', 'utf8', function (err, data) {
        if (err) {
            cb([])
        } else {
            cb(JSON.parse(data));
        }
    })
}

//修改用户JSON文件
function modifyUserInfo(data, cb) {
    fs.writeFile('./mock/usersInfo.json', JSON.stringify(data), cb)
}


//获取购物车信息
app.get('/shoppingCart/:id', function (req, res) {
    if (!req.session.login) {
        res.json({code: 0, login: false, error: '用户未登录'});
        return
    }
    let userId = req.params.id;
    if (isNaN(Number(userId))) {
        res.json({code: 1, login: true, error: '参数ID必须上传且是数字，例.../shoppingCart/1'});
        return;
    }
    getUsersInfo(function (data) {
        let userInfo = data.find(item => item.userId == userId);
        if (!userInfo) {
            res.json({code: 1, login: true, error: '未找到该用户信息，请检查参数ID是否传递正确'})
        } else {
            res.json({code: 0, login: true, cartInfo: userInfo.cartInfo})
        }
    })
});
//加入购物车、删除购物车中商品、修改购物车
app.route('/shoppingCart').post(function (req, res) {
        if (!req.session.login) {
            res.json({code: 0, login: false, error: '用户未登录'});
            return
        }
        let {userId, cartInfo} = req.body;
        if (isNaN(Number(userId))) {
            res.json({code: 1, login: true, error: 'userId必须上传且是数字'});
            return;
        }
        if (isNaN(Number(cartInfo.productId))) {
            res.json({code: 1, login: true, error: 'cartInfo.productId必须上传且是数字'});
            return;
        }
        getUsersInfo(function (data) {
            let userInfo = data.find(item => item.userId == userId);
            if (!userInfo) {
                res.json({code: 1, login: true, error: '未找到该用户，请检查userId是否传递正确'});
                return
            }
            let tempCartInfo = userInfo.cartInfo.find(item => item.productId == cartInfo.productId && item.typeModel == cartInfo.typeModel);
            if (tempCartInfo) {
                tempCartInfo.num += cartInfo.num
            } else {
                cartInfo.image=prefix+'images/productList/list-id-'+cartInfo.productId+'.jpg';
                userInfo.cartInfo.push(cartInfo)
            }
            modifyUserInfo(data, function () {
                res.json({code: 0, login: true, cartInfo: userInfo.cartInfo})
            });
        })
    }
).delete(function (req, res) {
    if (!req.session.login) {
            res.json({code: 0, login: false, error: '用户未登录'});
            return
        }
        let {userId, cartInfo} = req.body;
        if (isNaN(Number(userId))) {
            res.json({code: 1, login: true, error: 'userId必须上传且是数字'});
            return;
        }
        if (isNaN(Number(cartInfo.productId))) {
            res.json({code: 1, login: true, error: 'cartInfo.productId必须上传且是数字'});
            return;
        }
        getUsersInfo(function (data) {
            let userInfo = data.find(item => item.userId == userId);
            if (!userInfo) {
                res.json({code: 1, login: true, error: '未找到该用户，请检查userId是否传递正确'})
            } else {
                let isDelete=false;
                userInfo.cartInfo.forEach((item,index)=>{
                    if(item.productId == cartInfo.productId && item.typeModel == cartInfo.typeModel){
                        userInfo.cartInfo.splice(index,1);
                        isDelete=true;
                        modifyUserInfo(data, function () {
                            res.json({code: 0, login: true, cartInfo: userInfo.cartInfo})
                        });
                    }
                });
                if(!isDelete){ res.json({code: 1, login: true, error:'未找到对应用户的对应商品和对应型号'})}
            }
        })
    }
).put(function (req, res) {
    if (!req.session.login) {
        res.json({code: 0, login: false, error: '用户未登录'});
        return
    }
    let {userId, cartInfo} = req.body;
    if (isNaN(Number(userId))) {
        res.json({code: 1, login: true, error: 'userId必须上传且是数字'});
        return;
    }
    if (isNaN(Number(cartInfo.productId))) {
        res.json({code: 1, login: true, error: 'cartInfo.productId必须上传且是数字'});
        return;
    }
    getUsersInfo(function (data) {
        let userInfo = data.find(item => item.userId == userId);
        if (!userInfo) {
            res.json({code: 1, login: true, error: '未找到该用户，请检查userId是否传递正确'});
            return
        }
        let tempCartInfo = userInfo.cartInfo.find(item => item.productId == cartInfo.productId && item.typeModel == cartInfo.typeModel);
        if (tempCartInfo) {
            tempCartInfo.num = cartInfo.num;
            modifyUserInfo(data, function () {
                res.json({code: 0, login: true, cartInfo: userInfo.cartInfo})
            });
        }else{
            res.json({code: 1, login: true,error:'修改失败，请检查userId、cartInfo.productId和cartInfo.typeModel是否一一对应' })
        }

    })
});

//获取用户信息
app.get('/user/:id', function (req, res) {
    if (!req.session.login) {
        res.json({code: 0, login: false, error: '用户未登录'});
        return
    }
    let userId = req.params.id;
    getUsersInfo(function (data) {
        let userInfo = data.find(item => item.userId == userId);
        if (userInfo) {
            res.json({code: 0, login: true, userInfo})
        } else {
            res.json({code: 1, login: true, error: '未找到该用户信息，请检查用户id是否正确'})
        }
    })

});
//修改用户信息
app.put('/user', function (req, res) {
    if (!req.session.login) {
        res.json({code: 0, login: false, error: '用户未登录'});
        return
    }
    let reqBody = req.body;
    if (!reqBody.userId) {
        res.json({code: 1, login: true, error: '请在请求体内传递userId参数'});
        return;
    }

    getUsersInfo(function (data) {
        if (!data.some(item => item.userId == reqBody.userId)) {
            res.json({code: 1, error: '用户ID不存在'});
            return;
        }
        let isChange=false;
        data.forEach((item, index) => {
            if (item.userId == reqBody.userId) {
                let userInfo = data.splice(index, 1)[0];
                userInfo = {...userInfo, ...reqBody};
                data.splice(index, 0, userInfo);
                modifyUserInfo(data, function () {
                    res.json({code: 0, login: true, userInfo})
                });
                isChange=true;
            }
        });
        if(!isChange){
            res.json({code:1,login:true,error:'未找到对应的用户'})
        }
    });
});

//退出登录
app.get('/logout', function (req, res) {
    req.session.login = null;
    res.json({code: 0, success: '已退出'})
});
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
                userId: userInfo.length + 1,
                userName,
                password,
                phone,
                sex: 'man',
                mail: '',
                desc: '',
                address: [],
                orderForms: [],
                cartInfo: []
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
            req.session.login = true;
            res.json({code: 0, success: '登录成功', userId: userInfo.userId})
        } else {
            res.json({code: 1, error: '登录失败，用户名或密码错误'})
        }
    })
});

app.listen(port, function () {
    console.log(`正在监听${port}端口`);
});