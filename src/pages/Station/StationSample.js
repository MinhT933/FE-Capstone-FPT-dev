import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const stations = [...Array(20)].map((_, index) => ({
  id: faker.datatype.uuid(),
  stationName: faker.name.findName(),
  stationAddress: sample([
    'ngã tư chuồn chó',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
  openTime: sample([
    '6:00'
  ]),
  closeTime: sample([
    '12:00'
  ]),

  status: sample(['active', 'banned']),
}));

export default stations;
