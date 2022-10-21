import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const packagefood= [...Array(40)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/Food/food_${index + 1}.jpg`,
  name: sample(['package 1','package 2','package 3']),
  price:sample(['160.000','200.000','250.000']),
  description:sample(['ngon lắm á nha','thức ăn tốt cho sức khỏe']),
  createDate:faker.date.recent().toLocaleDateString(),
  updateDate:faker.date.recent().toLocaleDateString(),
  startSale:faker.date.recent().toLocaleDateString(),
  endSale:faker.date.recent().toLocaleDateString(),
  totalMeal:sample(['20','30','80']),
  totalfood:sample(['20','30','80']),
  status: sample(['active', 'isactive']),
  areaSale: sample(['đại học FBT','The Coffee House','Công ty TNHH XVXX']),
  datatype: sample([
    'thực phẩm chay',
    'thực phẩm tăng cân',
   
  ]),
}));

export default packagefood;
