import * as React from "react";
import { IConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { Box } from "@mui/material";
import { CreationContext } from "../../../lib/creation/Context";
import FileInput from "../../utilities/file";
import { Subheader, Subtitle } from "../utilities/HeaderComponents";
import { IDesign } from "@lib/creation/Interfaces";

const Logo: React.FC<{ context?: IConfigContext }> = (props) => {
  const defaultContext = React.useContext(CreationContext);
  const creationContext =
    props.context === undefined ? defaultContext : props.context;
  const data: IDesign = creationContext.api?.data.design ?? {
    theme: 0,
    logo: {
      file: {},
      url: "",
    },
    banner: {
      show: false,
      data: {
        file: {},
        url: "",
      },
    },
    footer: {
      show: false,
      mainText: "",
      links: [],
    },
  };
  const setData = (data: IDesign) => {
    creationContext.api?.setData({
      ...creationContext.api.data,
      design: data,
    });
  };
  const [url, setUrl] = React.useState<string>(data.logo.url);

  const reset = () => {
    setData({
      ...data,
      logo: {
        url: "",
        file: undefined,
      },
    });
  };

  function handleImage(e: any) {
    const fileInput = e.currentTarget.files;
    if (fileInput && fileInput[0]) {
      if (fileInput.length !== 1) return;
      if (fileInput[0].size > 1000000) {
        setData({
          ...data,
          logo: {
            ...data.logo,
            file: -1,
          },
        });
        return;
      }

      var reader = new FileReader();
      reader.onload = function (_e: any) {
        setUrl(_e.target.result);
      };

      reader.readAsDataURL(fileInput[0]);
      setData({ ...data, logo: { ...data.logo, file: fileInput[0] } });
    }
  }

  React.useEffect(() => {
    setData({ ...data, logo: { ...data.logo, url: url } });
  }, [url]);

  return (
    <Box
      sx={{
        borderTop: "1px solid",
        borderTopColor: "border.main",
        pt: "1rem",
        mt: "1rem",
      }}
    >
      <Box sx={{ width: "100%", mb: "1rem" }}>
        <Box sx={{ mb: ".5rem" }}>
          <Subheader title="Logo" />
        </Box>
        <Subtitle subtitle="Upload your own personalized logo for your DAO or simply use the auto-generated version created from your wallet address." />
      </Box>
      <FileInput
        file={data.logo === undefined ? "" : data.logo.file}
        fileUrl={data.logo === undefined ? "" : data.logo.url}
        handleImage={handleImage}
        id="logo-img-upload"
        reset={reset}
      />
    </Box>
  );
};

export default Logo;
