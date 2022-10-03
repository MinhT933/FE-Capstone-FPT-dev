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
const AdminViewFeedBack = [...Array(20)].map((_, index) => ({
    id: sample(['#000012',]),
    name: sample(['Thanh Nhi',]),

    phone: sample(['0901225688',]),

    kitchen: sample([
        'Bếp quận Bình Thạnh',
    ]),

    order: sample(['Cơm']),
    status: sample(['Ngon quá!', 'Mặn lắm à nha']),
})

);

export default AdminViewFeedBack;
