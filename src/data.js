import { timeoutPromise, createAsyncReader } from './utils';

async function getData(id) {
  console.log(`start getData [${id}]`);
  const time = Math.random() * 3000;
  await timeoutPromise(time);
  console.log(`finish getData [${id}] after ${time}`);
  return { time, id };
}

let usingId, reader;
export function startData(id) {
  usingId = id;
  reader = createAsyncReader(() => getData(id));
}

export function useData(id) {
  if (id !== usingId) {
    startData(id);
  }

  return reader();
}
