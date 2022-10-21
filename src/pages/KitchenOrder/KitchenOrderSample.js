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
const KitchenOrder = [...Array(20)].map((_, index) => ({
    id: sample(['Phở bò',
        'Cơm gà chiên',
        'Mì xào hải sản',
        'Bún bò huế thập cẩm',
        'Bánh bao xá xíu',
        'Bánh bao thập cẩm',
    ]),
    name: sample(['100', '75', '96']),

    phone: sample(['0901225688',]),

    station: sample([
        'ĐH FPT Q9',
    ]),

    order: sample(['Cơm']),
    note: sample(['Không hành']),

    status: sample(['Cooking', 'Done']),
})

);

export default KitchenOrder;
