import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
// id: VARCHAR(40)
// createdAt: DATETIME(6)
// updatedAt: DATETIME(6)
// customerID: VARCHAR(40)
// totalPrice: FLOAT
// status: VARCHAR(40)
// packageId: VARCHAR(40)
// startDelivery: TIME
// endDelivery: TIME
// ----------------------------------------------------------------------




const packagefood = [...Array(40)].map((_, index) => ({
    id: sample(['#005160', '#456020', '#250000']),
    type: sample(['Gói ăn nhanh', 'Gói ăn chay']),
    price: sample(['160.000', '200.000', '250.000']),

    name: sample(['Thanh Nhi']),
    phone: sample(['0901225688',]),

    createDate: faker.date.recent().toLocaleDateString(),
    startDelivery: sample(['01/10/2022']),
    endDelivery: sample(['06/10/2022']),
    address: sample(['đại học FBT', 'The Coffee House', 'Công ty TNHH XVXX']),
    status: sample(['Delivery', 'Not Delivery', 'Waiting']),

}));

export default packagefood;
