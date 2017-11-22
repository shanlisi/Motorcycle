/*README
 * 返回值：以下方法返回值都是一个promise对象
 *
 * myGet:发送get请求
 * 参数：
 *      url：请求的路径后缀(端口号之后)例如'/login'
 *
 * myPost:发送post请求
 * 参数：
 *      url:请求路径后缀 [Sting]
 *      data:请求体数据  [Object]
 *
 * myPut:发送put请求
 * 参数：
 *      url:请求路径后缀 [Sting]
 *      data:请求体数据  [Object]
 *
 * myDelete:发送delete请求
 * 参数：
 *      url:请求路径后缀 [Sting]
 *      data:请求体数据  [Object]
 */

//服务器域名和端口号前缀
const HOST='http://localhost:3000';

export function myGet(url) {
    return fetch(HOST+url,{
        method:'GET',
        credentials:"include",
        headers:{
            "Accept":"application/json",
        }
    }).then(res=>res.json())
}
export function myPost(url,data) {
    return fetch(HOST+url,{
        method:'POST',
        credentials:"include",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
}
export function myPut(url,data) {
    return fetch(HOST+url,{
        method:'PUT',
        credentials:"include",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
}
export function myDelete(url,data) {
    return fetch(HOST+url,{
        method:'DELETE',
        credentials:"include",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res=>res.json())
}