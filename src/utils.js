export function search(str,arr) {
    if (!str) {
        return []
    }
    return arr.filter(item => 
        item.toLocaleLowerCase().startsWith(str.toLocaleLowerCase()))
}