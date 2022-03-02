
export function storageSave<T>(key: string, value: T) : void{
    sessionStorage.setItem(key, JSON.stringify(value))
}

export function storageRead<T>(key:string) : T| null{
    const value = sessionStorage.getItem(key)
    try {
        if(value){
            return JSON.parse(value) as T;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function storageDelete(key:string) : void{
    sessionStorage.removeItem(key)
}