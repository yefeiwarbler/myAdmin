export function setLocalStorage(key, data){
    const baseTypes = ["boolean", "string", "number", "undefined", "bigint"];
    if( typeof data == "object" ){
        localStorage.setItem( key, JSON.stringify(data) );
    } else if( baseTypes.indexOf( typeof data ) > -1 ){
        localStorage.setItem( key, data );
    } else {
        throw(`given data is not supported for localStorage`);
    }
}

export function getLocalStorage(key){
    if( typeof key === "string" ){
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    }
    return "";
}

export function removeLocalStorage(key){
    if( typeof key === 'string' ){
        localStorage.removeItem(key);
    }
}