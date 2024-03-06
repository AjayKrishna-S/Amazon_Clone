import { calculateCartQuantity, cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrency from "../utils/money.js";


export function renderPaymentSummary(){
    let productPriceRupees = 0;
    let shippingPriceRupees = 0;
    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;
        const product = getProduct(productId);
        productPriceRupees += product.priceRupees * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceRupees += deliveryOption.priceRupees;
    });

    const priceBeforeTaxCents = productPriceRupees + shippingPriceRupees;
    const taxCents = priceBeforeTaxCents * (18/100);
    const totalCents = priceBeforeTaxCents + taxCents;
    let cartQuantity = calculateCartQuantity();

    const paymentSummaryHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">₹${formatCurrency(productPriceRupees)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${formatCurrency(shippingPriceRupees)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${formatCurrency(priceBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">₹${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`

document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
};