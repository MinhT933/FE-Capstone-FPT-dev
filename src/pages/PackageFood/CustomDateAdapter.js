import DateIOAdapter from "@mui/lab/AdapterMoment";

export default function CustomAdapter(options) {
  const adapter = new DateIOAdapter(options);

  const constructDayObject = (day) => ({ charAt: () => day });

  return {
    ...adapter,

    getWeekdays() {
      const customWeekdays = adapter.getWeekdays();

      return customWeekdays.map((day) => constructDayObject(day));
    },
  };
}
