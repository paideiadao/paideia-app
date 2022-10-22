import { useState } from 'react';
import { Avatar, Box, Button, Paper, Input, FormControl } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { bytesToSize } from "@lib/creation/Utilities";
import { deviceWrapper } from "@components/utilities/Style";

const DiscussionBanner: React.FC<{
  file: any;
  handleImage: Function;
  id: string;
  fileUrl: string;
  banner?: boolean;
}> = (props) => {
  const [dropHover, setDropHover] = useState('fileInput.outer')
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropHover('fileInput.main')
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropHover('fileInput.outer')
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.files)
    const object = {
      currentTarget: {
        files: e.dataTransfer.files
      }
    }
    props.handleImage(object)
    setDropHover('fileInput.outer')
    e.stopPropagation();
  }
  return (
    <Paper
      elevation={0}
      sx={{
        p: deviceWrapper("0", "1rem"),
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".5rem",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: dropHover,
          border: "1px dashed",
          borderColor: "fileInput.border",
          display: "block",
          position: 'relative',
          // display: "flex",
          // justifyContent: "center",
          // flexDirection: "column",
          // alignItems: "center",
          pt: 0,
          pb: "1rem",
        }}
      >
        <FormControl
          sx={{
            mt: 0,
            // pb: "1rem",
            width: '100%',
            height: "100%",
            position: 'absolute',
            display: 'flex',
            '&:hover': {
              cursor: 'pointer',
            }
          }}
          onDragEnter={e => handleDragEnter(e)}
          onDragLeave={e => handleDragLeave(e)}
          onDrop={e => handleDrop(e)}
        >
          <Input
            type="file"
            id={props.id}
            inputProps={{
              accept: "image/*",
            }}
            sx={{
              zIndex: 10,
              opacity: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              flexGrow: '1',
              '& input': {
                width: '100%',
                height: '100%',
                cursor: 'pointer !important',
              },
              '&::before': {
                display: 'none',
              },
              '&::after': {
                display: 'none',
              }
            }}
            onChange={(e) => props.handleImage(e)}
          />
        </FormControl>
        {props.fileUrl !== "" &&
          props.fileUrl !== undefined &&
          props.file !== undefined ? (
          <>
            <Box sx={{ width: "100%" }}>
              <img
                src={props.fileUrl}
                alt="Picture of the author"
                style={{
                  borderTopLeftRadius: ".2rem",
                  borderTopRightRadius: ".3rem",
                  width: "100%",
                }}
              />
              <Box
                sx={{
                  pl: "1rem",
                  pr: "1rem",
                  display: "flex",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    mt: ".2rem",
                    fontSize: deviceWrapper(".8rem", "1rem"),
                  }}
                >
                  {props.file.name}
                  <Box
                    sx={{
                      color: "text.secondary",
                      fontSize: deviceWrapper(".7rem", ".9rem"),
                    }}
                  >
                    {props.file === undefined || props.file === -1
                      ? "File Max size 1Mb. Dimensions 48px by 48px."
                      : bytesToSize(props.file.size)}
                  </Box>
                </Box>

                <Box sx={{ ml: "auto" }}>
                  <Button
                    variant="contained"
                    sx={{ mt: ".5rem" }}
                    size="small"
                    onClick={() => {
                      const fileInput = document.getElementById(props.id);
                      fileInput.click();
                    }}
                  >
                    Replace
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* <input
              type="file"
              id={props.id}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => props.handleImage(e)}
            /> */}
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              img: {
                maxHeight: deviceWrapper("9rem", "11.5rem"),
              },
            }}
          >
            <img
              src={props.fileUrl}
              alt="Banner for the discussion"
              style={{
                borderTopLeftRadius: ".2rem",
                borderTopRightRadius: ".3rem",
                width: "100%",
              }}
            />

            {/* <input
              type="file"
              id={props.id}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => props.handleImage(e)}
            /> */}
            <Box
              sx={{
                color: "text.primary",
                fontSize: deviceWrapper(".8rem", "1rem"),
                textAlign: "center",
                mt: ".5rem",
              }}
            >
              {props.file === undefined || props.file === -1
                ? "To replace, drop your image here or "
                : props.file.name}
              {(props.file === undefined || props.file === -1) && (
                <Box
                  sx={{
                    color: "primary.main",
                    display: "inline",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const fileInput = document.getElementById(props.id);
                    fileInput.click();
                  }}
                >
                  browse
                </Box>
              )}
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                textAlign: "center",
                fontSize: deviceWrapper(".7rem", "1rem"),
              }}
            >
              {props.file === undefined || props.file === -1
                ? "File Max size 1Mb. Dimensions 1200px by 400px."
                : bytesToSize(props.file.size)}
            </Box>
          </Box>
        )}
      </Paper>
    </Paper>
  );
};

export default DiscussionBanner;
