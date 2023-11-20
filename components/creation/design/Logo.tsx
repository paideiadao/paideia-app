import { IConfigContext } from "@lib/dao/dao-config/ConfigContext";
import { Box } from "@mui/material";
import * as React from "react";
import { CreationContext } from "../../../lib/creation/Context";
import FileInput from "../../utilities/file";
import { LearnMore, Subheader, Subtitle } from "../utilities/HeaderComponents";

const Logo: React.FC<{ context?: IConfigContext }> = (props) => {
  const creationContext =
    props.context === undefined
      ? React.useContext(CreationContext)
      : props.context;
  const data = creationContext.api.data.design;
  const setData = (data: any) => {
    creationContext.api.setData({
      ...creationContext.api.data,
      design: data,
    });
  };
  const [url, setUrl] = React.useState<any>(data.logo.url);

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
