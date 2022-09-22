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
// ----------------------------------------------------------------------
const kitchen = [...Array(20)].map((_, index) => ({
    id: faker.datatype.uuid(),
    kitchenName: sample([
        'Bếp Quận 1',
        'Bếp Quận 1',
        'Bếp DH FPT',
        'Bếp Quận 2',
        'Bếp Quận 2',
        'Bếp DH FPT',
        'Bếp Quận 1',
        'Bếp DH FPT',
    ]),
    kitchenAddress: sample([
        '265 Âu Cơ, Phường 5, Quận 11 ',
        '407D Lê Văn Sỹ, Phường 2, Quận 3',
        '193 Đ. Lê Văn Việt, Hiệp Phú, Quận 9',
        '195 Xô Viết Nghệ Tĩnh, Phường 17, Bình Thạnh',
        '2 Đ. Nguyễn Ảnh Thủ, Trung Mỹ Tây, Quận 12',
    ]),
    // phone: faker.date.phone(),

    phone: sample([
        'faker.date.phone() bị lỗi',
    ]),
    status: sample(['Opened', 'Closed', 'Waiting']),
    createDate: faker.date.recent().toLocaleDateString(),
    updateDate: faker.date.recent().toLocaleDateString(),
})

);

export default kitchen;
