import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const GroupFood = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample(["chay", "mặn", "đặc sản", "xào", "chiên"]),
  createDate: faker.date.recent().toLocaleDateString(),
  UpDateDay: faker.date.recent().toLocaleDateString(),
  FoodperGtoup: sample(["10/100"]),
  Quanlity: sample(["1000", "100", "300"]),
  status: sample(["đợi duyệt", "Hoạt động"]),
}));

export default GroupFood;
