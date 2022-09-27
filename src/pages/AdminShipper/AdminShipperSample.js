import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
// KITCHEN QUẢN LÍ SHIPPER
// id: VARCHAR(40)
// createdAt: DATETIME
// updatedAt: DATETIME
// NoPlate: VARCHAR(30)
// VehicleType: VARCHAR(50)
// accountId: VARCHAR(40)
// kitchenID: VARCHAR(40)
// ----------------------------------------------------------------------
const adminshipper = [...Array(20)].map((_, index) => ({
    id: sample(['#TX020', '#TX090', "#TX112"]),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    name: sample([
        'Xuân Trường',
        'Đức Phúc',
    ]),
    phone: sample(['0901225688',]),

    NoPlate: sample(['60-S1|147.94']),
    VehicleType: sample(['Honda Wave Đen']),

    status: sample(['Opened', 'Closed', 'Waiting']),
    accountId: sample(['#ducphuc123', 'xuantruong123']),
    kitchenID: sample(['#BE01?', 'Bếp quận 1']),
})

);

export default adminshipper;
