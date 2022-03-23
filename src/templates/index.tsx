import Banner, { Address } from "../components/banner";
import Cta from "../components/cta";

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
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" />
        </div>
      </Banner>
    </>
  );
};

export default Homepage;