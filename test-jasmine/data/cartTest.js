import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suit: addToCart',()=>{
    it('adds an new product to cart',()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        loadFromStorage();
        
        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d','1');
        expect(cart.length).toEqual(1);
    })
})