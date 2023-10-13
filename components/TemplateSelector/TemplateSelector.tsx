import DaoTemplate from "@components/dao/DaoTemplate";
import PageNotFound from "@pages/404";
import Creation from "@pages/creation";
import { AnimatePresence, motion } from "framer-motion";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

const daoVariants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

type TemplateSelectorProps = Pick<AppProps, "Component" | "pageProps">;

const TemplateSelector: React.FC<TemplateSelectorProps> = (props) => {
  const router = useRouter();

  const { Component, pageProps } = props;

  if (Component === Creation) {
    return <Component {...pageProps} />;
  }

  if (Component === PageNotFound) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <DaoTemplate>
        <AnimatePresence exitBeforeEnter>
          <motion.main
            variants={daoVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ type: "linear" }}
            className=""
            key={router.route}
          >
            <Component {...pageProps} />
          </motion.main>
        </AnimatePresence>
      </DaoTemplate>
    </>
  );
};

export default TemplateSelector;
