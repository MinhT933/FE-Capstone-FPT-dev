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
  ]),
  stationAddress: sample([
    '265 Âu Cơ, Phường 5, Quận 11 ',
    '407 Lê Văn Sỹ, Phường 2, Quận 3',
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

})

);

export default stations;
