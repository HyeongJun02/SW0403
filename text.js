const text = 'Hello World!';
console.log(text);
// split('o')인 경우 [ 'Hell', 'W', 'rld' ]로 나눠짐
// split('')인 경우 각 문자를 한 글자 씩 나눔
console.log(text.split(' '));
console.log(text.split(' ').join(', '));

const text2 = 'abc';
console.log(text2);
console.log(text2.split(''));
// map: 매핑
// a, b, c가 전부 t에 들어가서 돌아감
console.log(text2.split('').map(t => {
    if(t === 'a'){
        t = 'e';
    }
    return t;
}));
console.log(text2.split('').map(t => {
    if(t === 'a'){
        t = 'e';
    }
    return t;
}).join(',')
);