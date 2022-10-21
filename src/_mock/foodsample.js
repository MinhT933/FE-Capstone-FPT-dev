import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const food = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/Food/food_${index + 1}.jpg`,
  name: sample(['cơm chiên gà','gà chay','rau muốn xào tỏi']),
  price:sample(['160.000','200.000','250.000']),
  description:sample(['ngon lắm á nha','thức ăn tốt cho sức khỏe']),
  createDate:faker.date.recent().toLocaleDateString(),
  updateDate:faker.date.recent().toLocaleDateString(),
  status: sample(['active', 'isactive']),
  datatype: sample([
    'thực phẩm chay',
    'thực phẩm tăng cân',
   
  ]),
}));

export default food;
