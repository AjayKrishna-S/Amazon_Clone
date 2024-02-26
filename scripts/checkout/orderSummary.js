import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){
let orderSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const deliveryOptionId = cartItem.deliveryOptionId;

        const matchingProduct = getProduct(productId);
        const deliveryOption = getDeliveryOption(deliveryOptionId);

   

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
        const dateString = deliveryDate.format('dddd MMM D');

        orderSummaryHTML += 
            `<div class="cart-item-container js-cart-items-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                src=${matchingProduct.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    ₹${formatCurrency(matchingProduct.priceCents)}
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
                        <input class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        <span class="save-link link-primary js-save-link " data-product-id="${matchingProduct.id}">Save</span>
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
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
                </div>
            </div>`
    });

    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
            const dateString = deliveryDate.format('dddd MMM D');
            const priceString = deliveryOption.priceCents === 0 
            ? 'FREE' 
            : `₹${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

            html +=`<div class="delivery-option js-delivery-option"
                    data-product-id=${matchingProduct.id} 
                    data-delivery-option-id=${deliveryOption.id}>
                <input type="radio" ${isChecked ? 'Checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"/>
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
            </div>`
        })
    return html;
    };

    document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-items-container-${productId}`);
            container.remove();
            updateCartQuantity();
            renderPaymentSummary()
        });

    });

    function updateCartQuantity(){
        document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} Items`;
    };



    document.querySelectorAll('.js-update-quantity-link').forEach((updateItem)=>{
        updateItem.addEventListener('click',()=>{
            const productId = updateItem.dataset.productId;

            const container =document.querySelector(`.js-quantity-update-form-${productId}`);
            container.classList.add('is-quantity-update-visible');

            document.querySelector(`.js-update-quantity-${productId}`).classList.add('is-quantity-update-invisible');

            document.querySelector(`.js-update-quantity-count-${productId}`).classList.add('is-quantity-update-invisible');

            const quantityInputElem = document.querySelector(`.js-quantity-input-${productId}`);
            quantityInputElem.focus();
        })
    });

    document.querySelectorAll('.js-save-link').forEach((saveLink)=>{
        saveLink.addEventListener('click',()=>{
            const productId = saveLink.dataset.productId;
            handleSave(productId);
        });
    });

    document.querySelectorAll('.js-quantity-input').forEach((inputItem) => {
        inputItem.addEventListener('keydown',(e)=>{
            const productId = inputItem.dataset.productId;
            if(e.key === 'Enter'){
                handleSave(productId);
            };
        });
    });

    function handleSave(productId){
        const quantityInputElem = document.querySelector(`.js-quantity-input-${productId}`);
        const updatedQuantity = Number(quantityInputElem.value);

        if(updatedQuantity < 0 || updatedQuantity > 1000){
            alert('Quantity must be at least 0 and less than 1000');
            return;
        };
        updateQuantity(productId, updatedQuantity);

        const quantityCount = document.querySelector(`.js-update-quantity-count-${productId}`)
        quantityCount.innerHTML =  updatedQuantity;
        updateCartQuantity();

        document.querySelector(`.js-quantity-update-form-${productId}`).classList.remove('is-quantity-update-visible');
        document.querySelector(`.js-update-quantity-${productId}`).classList.remove('is-quantity-update-invisible');
        quantityCount.classList.remove('is-quantity-update-invisible');
        renderPaymentSummary()
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId,deliveryOptionId)
            renderOrderSummary();
            renderPaymentSummary()
        })
    })

    updateCartQuantity();
};




