var data = [
    {name: "Bruce", age: 23, id: 16, score: 80},
    {name: "Alice", age: 24, id: 12, score: 90},
    {name: "David", age: 21, id: 11, score: 70},
    {name: "Cindy", age: 22, id: 10, score: 100},
];
var flag = {
    name: true,
    age: true,
    id: true,
    score: true,
    price:true,
};
// 这个是找numer类型的值  升序
function upSort(propertyName) {
    if ((typeof data[0][propertyName]) != "number") {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value1.localeCompare(value2);
        }
    }
    /*会掉函数obj1 和objdect2  进行比较 如果不是number 就比较数据的 localeCompare和如果他是他话就比较大小*/
    else {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value1 - value2;
        }
    }
}
/*降序*/
function downSort(propertyName) {
    if ((typeof data[0][propertyName]) != "number") {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value2.localeCompare(value1);
        }
    }
    else {
        return function(object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            return value2 - value1;
        }
    }
}

// 组件  state 是
var TableBox = React.createClass({
    getInitialState: function() {
        return {data:this.props.data};
    },
    sort: function(e) {
        var prop = e.target.innerHTML;
        if (flag[prop] == true)
            this.state.data.sort(upSort(prop));
        else
            this.state.data.sort(downSort(prop));
        flag[prop] = !flag[prop];
        this.setState({data:this.state.data});
    },
    render: function() {
        return (
            <table>
                <thead>
                <tr>
                    <th onClick={this.sort}>name</th>
                    <th onClick={this.sort}>age</th>
                    <th onClick={this.sort}>id</th>
                    <th onClick={this.sort}>score</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map(function(item, index) {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.id}</td>
                                <td>{item.score}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        );
    }
})
ReactDOM.render(
    <TableBox data={data}/>,
    document.getElementById("tableBox")
);





const HOST = 'http://localhost:3000';
//后台的URL地址是3000端口
export function get(url){
    //这里会返回一个promise,resolve之后会传入响应体，就是轮播图数组
    //浏览器原生支持fetch方法，它的用法类似于 $.ajax
    return fetch(HOST+url,{
        method:'GET',//请求的方法名
        //客户跨域请求服务器的要携带cookie
        credentials:"include",
        headers:{//请求头
            //需要服务器返回JSON格式的数据
            "Accept":"application/json"
        }
    }).then(res=>res.json());
}
// 调用的时候：get('/slider').then(data=>{});

export  const post=(url,data)=>{
 return  fetch(url,{
     method:'post',
     credentials:"include",
     headers:{
       'Content-Type':'application/json',
        accept:'application/json'
     },
     body:JSON.stringify(data)
 }).then(res=>res.json());
}
