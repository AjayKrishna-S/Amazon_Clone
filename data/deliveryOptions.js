

export const deliveryOptions = [{
        id : '1',
        deliveryTime : 7,
        priceRupees : 0
    },
    {
        id : '2',
        deliveryTime : 3,
        priceRupees : 499
    },
    {
        id : '3',
        deliveryTime : 1,
        priceRupees : 999
    }
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach((option)=>{
        if(deliveryOptionId === option.id){
            deliveryOption = option
        };
    });
    return deliveryOption;
};