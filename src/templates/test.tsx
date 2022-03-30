import { useState } from 'react';
import { renderToString } from "react-dom/server";
import { reactWrapper } from '../wrapper';

export const config = {
  name: 'Product Test',
  hydrate: true,
  streamId: 'products',
  stream: {
    $id: 'products',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: ['name', 'meta', 'id', 'uid'],
    filter: {
      entityTypes: ['product'],
    },
    localization: {
      locales: [
        "en"
      ],
      primary: false
    },
  },
};

export const getPath = (data: any) => {
  return Math.random();
}

const Test = (props: any) => {
  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div>Hello from {props.name} starter</div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(
    data,
    'index',
    'index.tsx',
    renderToString(<Test data={data} />),
    true
  );

  export default Test;