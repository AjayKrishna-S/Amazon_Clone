import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
        id : '1',
        deliveryTime : 7,
        priceRupees : 0
    },
    {
        id : '2',
        deliveryTime : 3,
        priceRupees : 40
    },
    {
        id : '3',
        deliveryTime : 1,
        priceRupees : 80
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

function isWeekend(date){
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday'
}

export function calculateDeliveryDate(deliveryOption){
    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.deliveryTime,'days');


    let remainingDays = deliveryOption.deliveryTime;
    let deliveryDate = dayjs();

    while(remainingDays > 0){
        deliveryDate = deliveryDate.add(1,'day');

        if (!isWeekend(deliveryDate)){
            remainingDays-- ;
        }
    }

    return deliveryDate.format('dddd MMM D');
};