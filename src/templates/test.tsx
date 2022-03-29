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
  },
};

export const getPath = (data: any) => {
  return Math.random();
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const cogData = fs.readFileSync('localData/fastfood__631a91f020286f3ddf808a2dd52ce209.json')

//   return JSON.parse(cogData.toString());
// };

export const Page = (props: any) => {
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
    renderToString(<Page data={data} />),
    true
  );
