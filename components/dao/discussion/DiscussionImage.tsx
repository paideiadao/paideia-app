import DiscussionContext from "@lib/dao/discussion/DiscussionContext";
import { Typography } from "@mui/material";
import * as React from "react";
import DiscussionBanner from "./DiscussionBanner";

const DiscussionImage: React.FC = () => {
  const context = React.useContext(DiscussionContext);
  const data = context.api.value.image;
  const [url, setUrl] = React.useState<any>(data === undefined ? "" : data.url);

  function handleImage(e: any) {
    let fileInput = e.currentTarget.files;
    if (fileInput && fileInput[0]) {
      if (fileInput.length != 1) return;
      if (fileInput[0].size > 1000000) {
        context.api.setValue({
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
      context.api.setValue({
        ...context.api.value,
        image: {
          ...data,
          file: fileInput[0],
        },
      });
    }
  }

  React.useEffect(() => {
    context.api.setValue({
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
        Discussion image
      </Typography>
      <DiscussionBanner
        file={data === undefined ? "" : data.file}
        fileUrl={data === undefined ? "" : data.url}
        handleImage={handleImage}
        id="discussion-img-upload"
      />
    </>
  );
};

export default DiscussionImage;
