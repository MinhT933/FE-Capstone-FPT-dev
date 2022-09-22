import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
// STATION
// id: VARCHAR(40)
// createdAt: DATETIME(6)
// updatedAt: DATETIME(6)
// name: VARCHAR(200)
// address: VARCHAR(200)
// phone: VARCHAR(12)
// openTime: DATETIME
// closeTime: DATETIME
// isActive: BOOLEAN
// ----------------------------------------------------------------------
const stations = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  stationName: sample([
    'Cong Vien PM QT',
    'Khu CN Cao Q9',
    'DH FPT',
    'Cong Vien PM QT',
    'Khu CN Cao Q9',
    'DH FPT',
    'Cong Vien PM QT',
    'DH FPT',
  ]),
  stationAddress: sample([
    '265 Âu Cơ, Phường 5, Quận 11 ',
    '407D Lê Văn Sỹ, Phường 2, Quận 3',
    '193 Đ. Lê Văn Việt, Hiệp Phú, Quận 9',
    '195 Xô Viết Nghệ Tĩnh, Phường 17, Bình Thạnh',
    '193 Đ. Lê Văn Việt, Hiệp Phú, Quận 9',
    '14 Phạm Ngọc Thạch, Phường 6, Quận 3',
    '407D Lê Văn Sỹ, Phường 2, Quận 3',
    '195 Xô Viết Nghệ Tĩnh, Phường 17, Bình Thạnh',
    '2 Đ. Nguyễn Ảnh Thủ, Trung Mỹ Tây, Quận 12',
    'DH FPT',
  ]),
  openTime: sample([
    '6:00'
  ]),
  closeTime: sample([
    '12:00'
  ]),

  status: sample(['Opened', 'Closed', 'Waiting']),
  createDate: faker.date.recent().toLocaleDateString(),
  updateDate: faker.date.recent().toLocaleDateString(),

})

);

export default stations;
