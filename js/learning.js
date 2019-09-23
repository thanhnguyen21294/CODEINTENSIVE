//bolean
// 0 , '', null, undefined, NaN, false ~ false
// else ~ true
if (0) {
    console.log('not run');
    
}

if (1) {
    console.log('run');
    
}


//number
let integer = parseInt('1')
let float = parseFloat('10.5')
console.log(integer);
console.log(float);

//string
let num = 10;
console.log(num);
console.log(num + '');

let str = 'abc a sd af'
console.log(str.split(''));
console.log(str.split(' '));
console.log(str.substring(0,5));
console.log(str.substring(0,str.indexOf('d')));
console.log(str.substring(0,str.lastIndexOf('a')));
console.log(str.substring(0,str.endsWith(' ')));



