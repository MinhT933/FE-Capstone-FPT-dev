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
    id: faker.datatype.uuid(),
    type: faker.datatype.uuid(),
    price: sample(['160.000', '200.000', '250.000']),

    name: sample(['package 1', 'package 2', 'package 3']),
    phone: faker.datatype.uuid(),

    createDate: faker.date.recent().toLocaleDateString(),
    address: sample(['đại học FBT', 'The Coffee House', 'Công ty TNHH XVXX']),
    status: sample(['active', 'isactive']),
   
}));

export default packagefood;
