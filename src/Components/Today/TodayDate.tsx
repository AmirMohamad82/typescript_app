function TodayDate() {
  const daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today: Date = new Date();
  const dayOfWeek: string = daysOfWeek[today.getDay()];
  const date: number = today.getDate();
  const month: string = months[today.getMonth()];

  return (
    <>
      {dayOfWeek}, {date} {month}
    </>
  );
}

export default TodayDate;
