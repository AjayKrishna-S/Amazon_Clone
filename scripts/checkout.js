import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let orderSummeryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct = '';

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        };
        
    });
    orderSummeryHTML += 
        `<div class="cart-item-container js-cart-items-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingProduct.image}>

            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label js-update-quantity-count-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                    Update
                </span>

                <div class="is-quantity-update-invisible js-quantity-update-form-${matchingProduct.id}" >
                    <input autofocus class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link " data-product-id="${matchingProduct.id}">Save</span>
                </div>

                <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingProduct.id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`
});

document.querySelector('.js-order-summary').innerHTML = orderSummeryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-items-container-${productId}`);
        container.remove();
        updateCartQuantity();
    });

});

function updateCartQuantity(){
    document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} Items`;
};



document.querySelectorAll('.js-update-quantity-link').forEach((updateItem)=>{
    updateItem.addEventListener('click',()=>{
        const productId = updateItem.dataset.productId;

        document.querySelector(`.js-quantity-update-form-${productId}`).classList.add('is-quantity-update-visible');

        document.querySelector(`.js-update-quantity-${productId}`).classList.add('is-quantity-update-invisible');

        document.querySelector(`.js-update-quantity-count-${productId}`).classList.add('is-quantity-update-invisible');


        
    })
    
})

document.querySelectorAll('.js-save-quantity-link').forEach((saveLink)=>{
    saveLink.addEventListener('click',()=>{
        const productId = saveLink.dataset.productId;

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
        const updatedQuantity = Number(quantityInput.value);
        if(updatedQuantity < 0 || updatedQuantity > 1000){
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }

        saveQuantity(productId,updatedQuantity);


    })


});



function saveQuantity(productId, updatedQuantity){
    updateQuantity(productId, updatedQuantity);

    document.querySelector(`.js-update-quantity-count-${productId}`).innerHTML =  updatedQuantity;
    updateCartQuantity();

    document.querySelector(`.js-quantity-update-form-${productId}`).classList.remove('is-quantity-update-visible');

    document.querySelector(`.js-update-quantity-${productId}`).classList.remove('is-quantity-update-invisible');

    document.querySelector(`.js-update-quantity-count-${productId}`).classList.remove('is-quantity-update-invisible');
};


updateCartQuantity();

