import Cta from '../components/cta';

type Link = {
  label: string;
  url: string;
};

type Header = {
  links: Link[];
  logo: string;
};

const Header = (props: Header) => {
  const { links, logo } = props;

  return (
    <>
      <div className="centered-container">
        <nav className="py-4 flex items-center justify-between">
          <img src={logo} width="50" height="50"></img>
          <div className="text-xl font-semibold">Yext's Fashion Warehouse</div>
          {/* <div>{JSON.stringify(links)}</div> */}
          <div className="space-x-5">
            <Cta buttonText="CTA 1" url="#"></Cta>
            <Cta buttonText="CTA 2" url="#"></Cta>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
