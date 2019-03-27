const infoArray = [
    'mobile app',
    'mobile development',
    'mobile application',
    'mobile ao',
    'ao',
    'momo',
];

// export function search(str) {
//     if (!str || str.length < 3) {
//         return Promise.resolve([])
//     }
//     return infoArray.filter(item =>
//         item.toLocaleLowerCase().startsWith(str.toLocaleLowerCase()))
// };

export function search(str) {
    if (!str) {
        return []
    }
    return infoArray.filter(item => 
        item.toLocaleLowerCase().startsWith(str.toLocaleLowerCase()))
}