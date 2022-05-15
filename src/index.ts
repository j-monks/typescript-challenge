import * as fs from 'fs';
import moment, { Moment } from "moment";

interface Interval {
  intervalStart: Moment;
  intervalEnd: Moment;
}

interface Worker {
    workerId: string;
    intervals: Interval[];
  }

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  const inputFile = fs.readFileSync(inputFilePath,'utf8')
  const lines = inputFile.trim().split(/\r?\n/);

  const workers: Worker[] = buildWorkers(lines);
  const allIntervals: Interval[] = retrieveAllIntervals(workers);

  const earliestInterval = retrieveEarliestInterval(allIntervals);

  return earliestInterval.intervalStart.toISOString();
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  const inputFile = fs.readFileSync(inputFilePath,'utf8')
  const lines = inputFile.trim().split(/\r?\n/);

  const workers: Worker[] = buildWorkers(lines);
  const allIntervals: Interval[] = retrieveAllIntervals(workers);

  const latestInterval = retrieveLatestInterval(allIntervals);

  return latestInterval.intervalEnd.toISOString();
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  // TODO: Solve me!
  const inputFile = fs.readFileSync(inputFilePath,'utf8')
  const lines = inputFile.trim().split(/\r?\n/);

  const workers: Worker[] = buildWorkers(lines);
  const allIntervals: Interval[] = retrieveAllIntervals(workers);

  const overlappers: Interval[] = [];
  // Loop through all worker intervals finding any overlappers
  for (let i = 0; i < allIntervals.length; i++) {
      for(let j = i + 1; j < allIntervals.length; j++) {
         const overlapResult = findOverlappers(allIntervals[i], allIntervals[j]);
         if (overlapResult != null) {
           overlappers.push(overlapResult);
         }
      }
   }

  // Sort overlappers in ascending order by earliest interval
  const sortedOverlappers = overlappers.sort((a, b) => (b.intervalStart.isBefore(a.intervalStart) ? 1 : -1));
  const mergedIntervals: Interval[] = [];

  let previousInterval = sortedOverlappers[0];

   // Merge overlapping intervals into one interval
   for (let i = 1; i < sortedOverlappers.length; i += 1) {
     if (sortedOverlappers[i].intervalStart.isSame(previousInterval.intervalEnd) || sortedOverlappers[i].intervalStart.isBefore(previousInterval.intervalEnd)) {
       previousInterval.intervalEnd = !sortedOverlappers[i] || previousInterval.intervalEnd.isAfter(sortedOverlappers[i].intervalEnd) ? previousInterval.intervalEnd : sortedOverlappers[i].intervalEnd;
     } else {
       mergedIntervals.push(previousInterval);
       previousInterval = sortedOverlappers[i];
     }
   }

   mergedIntervals.push(previousInterval);
   // Interpolate merged intervals into correct original format
   const formattedIntervals: string[] | PromiseLike<string[]> = [];
   mergedIntervals.forEach((interval) => formattedIntervals.push(`${interval.intervalStart.toISOString()}/${interval.intervalEnd.toISOString()}`));

   return formattedIntervals;
}

// Parse inputFile lines and build a worker object, consisting of a workerId and the workers intervals
const buildWorkers = (inputLines: string[]) => {
 return inputLines.map((line) => {
    const [workerId] = line.split('@')
    const workerInterval = line.replace(/^.+@/, '').replace('[', '').replace(']', '').split(',');
    const parsedInterval = workerInterval.map(interval => interval.split("/").map((intervalString => moment(intervalString))));
    const intervals = parsedInterval.map(interval => {
        return { intervalStart: interval[0], intervalEnd: interval[1] }
      })

    return {
      workerId,
      intervals
    }
  })
}
// Retrieve all intervals from each worker and place them into one array
const retrieveAllIntervals = (workers: Worker[]) => {
  const allIntervals: Interval[] = [];

  workers.forEach(worker => {
      worker.intervals.forEach(interval => {
          allIntervals.push(interval)
      })
  })

  return allIntervals;
}
// Retrieve earliest interval using the intervals start time from a list of intervals
const retrieveEarliestInterval = (allIntervals: Interval[]) => {
  return allIntervals.reduce((a, b) => {
    return !a || b.intervalStart.isBefore(a.intervalStart) ? b : a;
  });
}
// Retrieve latest interval using the intervals end time from a list of intervals
const retrieveLatestInterval = (allIntervals: Interval[]) => {
  return allIntervals.reduce((a, b) => {
    return !a || b.intervalEnd.isBefore(a.intervalEnd) ? a : b;
  });
}
// Compare two seperate intervals and check if they have overlapping intervals, if so return them
const findOverlappers = (firstInterval: Interval, secondInterval: Interval) => {
  if (firstInterval.intervalStart.isBefore(secondInterval.intervalEnd) && secondInterval.intervalStart.isBefore(firstInterval.intervalEnd)) {
    let earliestIntervalEnd = firstInterval.intervalEnd.isBefore(secondInterval.intervalEnd) ? firstInterval.intervalEnd : secondInterval.intervalEnd;
    let latestIntervalStart = firstInterval.intervalStart.isAfter(secondInterval.intervalStart) ? firstInterval.intervalStart : secondInterval.intervalStart;

    return { intervalStart: latestIntervalStart, intervalEnd: earliestIntervalEnd };
  }
}