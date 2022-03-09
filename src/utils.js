export function timeoutPromise(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function createAsyncReader(asyncFn) {
  let status = 'pending';
  let result, error;

  const suspender = asyncFn().then(r => {
    status = 'success';
    result = r;
  }, e => {
    status = 'failed';
    error = e;
  });

  return () => {
    if (status === 'pending') throw suspender; // KEY POINT: throw promise!
    if (status === 'failed') throw error;
    if (status === 'success') return result;
  }
}
