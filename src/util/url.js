
// 获取url参数
export function getUrlParam(name){
    let queryString = window.location.search.split("?")[1] || "";
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    let res = queryString.match(reg);
    return res === null ? "" : decodeURIComponent(res[2]);
}