import React, { useState } from 'react';
import { useData } from './data';
import { timeoutPromise, createAsyncReader } from './utils';
import logo from './logo.svg';
import './App.css';

function LazyCompSrc() {
  return (
    <div>lazy comp</div>
  );
}
const LazyComp = React.lazy(async () => {
  await timeoutPromise(2000);
  //const comp = await import('./LazyComp.js');
  //console.log(comp);
  return {
    default: LazyCompSrc,
  };
});

let reader, readerId;
function SimpleSuspenseDemo({ id }) {
  if (readerId !== id) {
    readerId = id;
    reader = createAsyncReader(async () => {
      console.log(`start SimpleSuspenseDemo [${id}]`);
      const time = Math.random() * 3000;
      await timeoutPromise(time);
      console.log(`finish SimpleSuspenseDemo [${id}] after ${time}`);
      return time;
    });
  }

  return <p>SimpleSuspenseDemo [{ id }]: { reader() }</p>
};

function ShowData({ id }) {
  const data = useData(id);

  return <p>{ JSON.stringify(data) }</p>
}

function App() {
  console.log('App rendering');
  const [id, setId] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h4>id: { id }</h4>
        <button onClick={() => setId(id + 1)}>id++</button>
        <React.Suspense fallback={<p>loading LazyComp...</p>}>
          <LazyComp />
        </React.Suspense>
        <React.Suspense fallback={<p>waiting for SimpleSuspenseDemo and data...</p>}>
          <SimpleSuspenseDemo id={id} />
          <ShowData id={id} />
        </React.Suspense>
      </header>
    </div>
  );
}

export default App;
