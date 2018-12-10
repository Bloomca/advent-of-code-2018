const fs = require("fs");

const rawTimetable = fs.readFileSync("4_input.txt", { encoding: "utf-8" });

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

const frequentMinutesGuards = Object.keys(guards).map(id => {
  const guard = guards[id];

  const minutes = Object.keys(guard.minutes).map(minute => ({
    minute,
    value: guard.minutes[minute]
  }));

  minutes.sort((a, b) => b.value - a.value);
  const minute = (minutes[0] && minutes[0].minute) || 0;
  const times = (minutes[0] && minutes[0].value) || 0;

  return { id, minute, times };
});

frequentMinutesGuards.sort((a, b) => b.times - a.times);

const mostSleepingGuard = frequentMinutesGuards[0];

console.log(
  `most frequently sleeping at the same minute guard id is ${
    mostSleepingGuard.id
  }`
);
console.log(
  `the most common minute is ${mostSleepingGuard.minute}, total ${
    mostSleepingGuard.times
  } mins were slept during it`
);
console.log(
  `Multiplication of ID * most sleeping minute is ${mostSleepingGuard.id *
    mostSleepingGuard.minute}`
);

function parseData(str) {
  const matchedData = str.match(/^\[(\d+)-(\d+)-(\d+)\s(\d+):(\d+)/);

  const [_full, year, month, day, hour, minute] = matchedData.map(Number);

  return { year, month, day, hour, minute };
}
