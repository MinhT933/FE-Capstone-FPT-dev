import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
// KITCHEN
// id: VARCHAR(40)
// createdAt: DATETIME
// updatedAt: DATETIME
// name: VARCHAR(200)
// address: VARCHAR(200)
// phone: VARCHAR(200)
// isActive: BOOLEAN

//KITCHEN VER2
// id: VARCHAR(40)
// createdAt: DATETIME
// updatedAt: DATETIME
// kitchenName: VARCHAR(200)
// address: VARCHAR(200)
// ability: INT
// ----------------------------------------------------------------------
const kitchen = [...Array(20)].map((_, index) => ({
    id: faker.datatype.uuid(),
    kitchenName: sample([
        'Bếp Quận 1',
        'Bếp DH FPT',
        'Bếp Quận 12',
    ]),
    kitchenAddress: sample([
        '265 Âu Cơ, Phường 5, Quận 11 ',
        '407 Lê Văn Sỹ, Phường 2, Quận 3',
    ]),
    // phone: faker.date.phone(),

    phone: sample([
        '0901225688',
    ]),

    openTime: sample([
        '9:00'
    ]),
    closeTime: sample([
        '12:00'
    ]),

    status: sample(['Opened', 'Closed', 'Waiting']),
    createDate: faker.date.recent().toLocaleDateString(),
    updateDate: faker.date.recent().toLocaleDateString(),
    ability: sample(['120 món', '200 món']),
})

);

export default kitchen;
