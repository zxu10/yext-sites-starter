import Banner from '../components/banner';
import Header from '../components/header';
import Footer from '../components/footer';
import Cta from '../components/cta';
import Contact from '../components/contact';
import Hours from '../components/hours';
import { reactWrapper } from '../wrapper';
import { renderToString } from "react-dom/server";

export const config = {
  name: 'index',
  hydrate: true,
  streamId: "products",
  stream: {
    $id: 'products',
    source: 'knowledgeGraph',
    destination: 'pages',
    "fields": [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "photoGallery",
      "slug",
      "geocodedCoordinate",
      "services",
      "neighborhood",
      "paymentOptions",
      "c_relatedFAQs.question",
      "c_relatedFAQs.answer",
    ],
    filter: {
      entityTypes: ['location'],
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
  return `index/${data.document.streamOutput.uid.toString()}`;
}

const Index = ({ data }: { data: any }) => {
  const { document } = data;
  const { streamOutput } = document;
  const { name, address, openTime, hours, mainPhone, _site } = streamOutput;

  return (
    <>
      <Header
        logo="https://logos-download.com/wp-content/uploads/2020/06/Yext_Logo-700x700.png"
        links={_site.c_header}
      ></Header>
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta buttonText="Get Directions" url="http://google.com" />
        </div>
      </Banner>
      {hours && <Hours title={'Restaurant Hours'} hours={hours} />}
      <div className="centered-container">
        {/* <Hours></Hours> */}
        <div className="section">
          <Contact address={address} phone={mainPhone}></Contact>
        </div>
        <div className="section"></div>
        <Footer></Footer>
      </div>
      <Hours title={'Restaurant Hours'} hours={hours} />
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(
    data,
    'index',
    'index.tsx',
    renderToString(<Index data={data} />),
    config.hydrate,
  );

  export default Index;