import formatCurrency from '../../scripts/utils/money.js'

describe('test suit: formatCurrency', ()=>{
    it('rounds up to nearest value',()=>{
        expect(formatCurrency(2000.10)).toEqual(2000);
    });

    it('works with 0',()=>{
        expect(0.00).toEqual(0.00)
    })
})