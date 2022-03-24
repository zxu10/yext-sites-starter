type Hours = {
  title?: string;
  hours: Week;
  children?: React.ReactNode;
}

interface Week extends Record<string, any> {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

type Day = {
  isClosed: boolean;
  openIntervals: OpenIntervals[];
}

type OpenIntervals = {
  start: string;
  end: string;
}

const sorter: { [key: string]: number } = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7
};

function sortByDay(week: Week): Week {
  let tmp = [];
  for (const [k, v] of Object.entries(week)) {
    tmp[sorter[k]] = { key: k, value: v };
  }

  let orderedWeek: Week = {};
  tmp.forEach(function (obj) {
    orderedWeek[obj.key] = obj.value;
  });

  return orderedWeek;
};

const renderHours = (week: Week) => {
  let dayDom: JSX.Element[] = [];
  for (const [k, v] of Object.entries(sortByDay(week))) {
    dayDom.push(<DayRow key={k} dayName={k} day={v} />);
  }

  return (
    <tbody>
      {dayDom}
    </tbody>
  );
}

function convertTo12HourFormat(hours: string) {
  return ((Number(hours) + 11) % 12 + 1);
}

type DayRow = {
  dayName: string;
  day: Day;
}

const DayRow = (props: DayRow) => {
  const {
    dayName,
    day,
  } = props;

  return (
    <tr>
      <th className="capitalize text-left pr-4">{dayName}</th>
      {!day.isClosed &&
        <th>{day.openIntervals[0].start} - {day.openIntervals[0].end}</th>
      }
      {day.isClosed &&
        <th>Closed</th>
      }
    </tr>
  );
}

const Hours = (props: Hours) => {
  const {
    title,
    hours,
  } = props;

  return (
    <>
      <div>{title}</div>
      <table>
        <thead className="sr-only">
          <tr>
            <th>Day of the Week</th>
            <th>Hours</th>
          </tr>
        </thead>
        {renderHours(hours)}
      </table>
    </>
  );
};

export default Hours;