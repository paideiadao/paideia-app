import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Typography } from "@mui/material";
import * as React from "react";
import DiscussionBanner from "../discussion/DiscussionBanner";

const ProposalImage: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const data = context.api?.value.image;
  const [url, setUrl] = React.useState<any>(data === undefined ? "" : data.url);

  function handleImage(e: any) {
    let fileInput = e.currentTarget.files;
    if (fileInput && fileInput[0]) {
      if (fileInput.length != 1) return;
      if (fileInput[0].size > 1000000) {
        context.api?.setValue({
          ...context.api.value,
          image: {
            ...data,
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
      context.api?.setValue({
        ...context.api.value,
        image: {
          ...data,
          file: fileInput[0],
        },
      });
    }
  }

  React.useEffect(() => {
    context.api?.setValue({
      ...context.api.value,
      image: {
        ...data,
        url: url,
      },
    });
  }, [url]);

  return (
    <>
      <Typography
        sx={{
          mt: "20px",
          mb: "12px",
          fontSize: "0.9rem",
        }}
      >
        Proposal Image
      </Typography>
      <DiscussionBanner
        file={data === undefined ? "" : data.file}
        fileUrl={data === undefined ? "" : data.url}
        handleImage={handleImage}
        id="proposal-img-upload"
      />
    </>
  );
};

export default ProposalImage;
