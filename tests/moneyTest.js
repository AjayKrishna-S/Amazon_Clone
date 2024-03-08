import formatCurrency from '../scripts/utils/money.js'

console.log('test suit : formatCurrency');
console.log('round up');

if (formatCurrency(2000.10) === 2000){
    console.log('passed');
} else{
    console.log('failed');
}

console.log('work with 0');

if (formatCurrency(0.00) === 0.00){
    console.log('passed');
} else{
    console.log('failed');
}