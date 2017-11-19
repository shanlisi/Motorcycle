
const HOST='http://localhost:3000';
export function get(url) {
    return fetch(HOST+url,{
        method:'GET',
        credentials:"include",
        headers:{
            "Accept":"application/json",
        }
    }).then(res=>{
        return res.json()
    })
}
export function post(url,data) {
    return fetch(HOST+url,{
        method:'POST',
        credentials:"include",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    })
}