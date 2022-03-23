import Banner, { Address } from "../components/banner";

// export const getServerSideProps = () => {
//     return { message: "Hello from the server!" };
//   };

export const config = {
  name: "index",
  hydrate: true,
  streamId: "products",
  stream: {
    "$id": "products",
    "source": "knowledgeGraph",
    "destination": "pages",
    "fields": [
      "name",
      "meta",
      "id",
      "uid"
    ],
    "filter": {
      "entityTypes": [
        "product"
      ]
    },
  },
};

type Props = {
  name: string;
  address: Address;
};
  
const Homepage = (props: any) => {
  const {
    name,
    address,
    openTime,
  } = props;

  return (
    <>
      <Banner name={name} address={address} openTime={openTime} />
    </>
  );
};
  
export default Homepage;