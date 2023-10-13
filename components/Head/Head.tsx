import NextHead from "next/head";

interface HeadProps {
  title: string;
}

const Head: React.FC<HeadProps> = (props) => {
  const { title } = props;

  return (
    <NextHead>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes"
      />
    </NextHead>
  );
};

export default Head;
