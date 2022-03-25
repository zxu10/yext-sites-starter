type Cta = {
  buttonText: string;
  url: string;
};

const Cta = (props: Cta) => {
  const { buttonText, url } = props;

  return (
    <a
      href={url}
      className="py-4 px-6 bg-blue-400 text-base font-bold text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {buttonText}
    </a>
  );
};

export default Cta;
