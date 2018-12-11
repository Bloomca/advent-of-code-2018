const fs = require("fs");

const rawTimetable = fs.readFileSync("input.txt", { encoding: "utf-8" });

const timetable = rawTimetable
  .trim()
  .split("\n")
  .map(str => ({
    str,
    time: parseData(str)
  }));

// sort timetable by date (so order is chronological)
timetable.sort((a, b) => {
  const keys = ["year", "month", "day", "hour", "minute"];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (a.time[key] === b.time[key]) {
      continue;
    }

    return a.time[key] - b.time[key];
  }

  return 0;
});

const guards = {};

timetable.reduce((status, data) => {
  // start new
  const newShift = data.str.match(/Guard #(\d+) begins shift/);
  const fallsAsleep = data.str.includes("falls asleep");
  const wakesUp = data.str.includes("wakes up");
  if (newShift) {
    status.guard = newShift[1];

    if (!guards[status.guard]) {
      guards[status.guard] = {
        sleepingTime: 0,
        minutes: {}
      };
    }
  } else if (fallsAsleep) {
    status.fallAsleep = data.time.hour * 60 + data.time.minute;
    status.fallAsleepTime = data.time;
  } else if (wakesUp) {
    const wakingTime = data.time.hour * 60 + data.time.minute;
    const sleepingTime = wakingTime - status.fallAsleep;
    guards[status.guard].sleepingTime += sleepingTime;

    if (status.fallAsleepTime.hour === data.time.hour) {
      for (let i = status.fallAsleepTime.minute; i < data.time.minute; i++) {
        if (!guards[status.guard].minutes[i]) {
          guards[status.guard].minutes[i] = 0;
        }
        guards[status.guard].minutes[i]++;
      }
    } else {
      console.error("IT HAPPENED");
      process.exit(2);
    }
  } else {
    console.error("we should not be here");
    process.exit(1);
  }

  return status;
}, {});

const sleepingTimeByGuard = Object.keys(guards).map(id => ({
  id,
  time: guards[id].sleepingTime
}));

sleepingTimeByGuard.sort((a, b) => b.time - a.time);

const mostSleepingGuard = sleepingTimeByGuard[0];

const minutes = Object.keys(guards[mostSleepingGuard.id].minutes).map(
  minute => ({
    minute,
    value: guards[mostSleepingGuard.id].minutes[minute]
  })
);

minutes.sort((a, b) => b.value - a.value);

console.log(`most sleeping guard id is ${mostSleepingGuard.id}`);
console.log(`he slept in total ${mostSleepingGuard.time} minutes`);
console.log(
  `the most common minute is ${minutes[0].minute}, total ${
    minutes[0].value
  } mins were slept during it`
);
console.log(
  `Multiplication of ID * most sleeping minute is ${mostSleepingGuard.id *
    minutes[0].minute}`
);

function parseData(str) {
  const matchedData = str.match(/^\[(\d+)-(\d+)-(\d+)\s(\d+):(\d+)/);

  const [_full, year, month, day, hour, minute] = matchedData.map(Number);

  return { year, month, day, hour, minute };
}
