import Banner, { Address } from "../components/banner";
import Header from "../components/header";
import Footer from "../components/footer";
import Cta from "../components/cta";
import Contact from "../components/contact";
import FeaturedItems from "../components/featured-items";
import Hours from "../components/hours";
import Contact from "../components/contact";
import FeaturedItems from "../components/featured-items";


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
  mainPhone: string;
};

const Homepage = (props: any) => {
  const {
    name,
    address,
    openTime,
    hours,
    mainPhone,
    _site
  } = props;

  console.log(address)

  return (
    <>
      <Header logo="https://logos-download.com/wp-content/uploads/2020/06/Yext_Logo-700x700.png" links={_site.c_header}></Header>
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" />
        </div>
      </Banner>
      <div className="centered-container">
        {/* <Hours></Hours> */}
        <div className="section">
          <Contact address={address} phone={mainPhone}></Contact>
        </div>
        <div className="section">
        </div>
        <Footer></Footer>
      </div>
      <Hours title={"Restaurant Hours"} hours={hours} />
      <div className="centered-container">
        {/* <Hours></Hours> */}
        <div className="section">
          <Contact address={address} phone={mainPhone}></Contact>
        </div>
        <div className="section">
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Homepage;