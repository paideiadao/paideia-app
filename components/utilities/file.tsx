import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Input,
  FormControl,
  IconButton,
} from "@mui/material";
import { bytesToSize } from "../../lib/creation/Utilities";
import ImagePlaceholder from "../../public/images/image-placeholder.png";
import { deviceStruct } from "./Style";
import { Close } from "@mui/icons-material";

const FileInput: React.FC<{
  file: any;
  handleImage: Function;
  reset?: Function;
  id: string;
  fileUrl: string;
  banner?: boolean;
}> = (props) => {
  const [dropHover, setDropHover] = useState("fileInput.outer");
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropHover("fileInput.main");
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropHover("fileInput.outer");
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const object = {
      currentTarget: {
        files: e.dataTransfer.files,
      },
    };
    props.handleImage(object);
    setDropHover("fileInput.outer");
    e.stopPropagation();
  };
  return (
    <Paper
      elevation={0}
      sx={{
        p: "1rem",
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
          height: "8rem",
          display: "block",
          position: "relative",
        }}
      >
        {props.file !== undefined && props.file !== -1 && (
          <IconButton
            sx={{ position: "absolute", zIndex: 100, right: 0 }}
            onClick={() => {
              props.reset && props.reset();
            }}
          >
            <Close />
          </IconButton>
        )}
        <FormControl
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDrop={(e) => handleDrop(e)}
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
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              flexGrow: "1",
              "& input": {
                width: "100%",
                height: "100%",
                cursor: "pointer !important",
              },
              "&::before": {
                display: "none",
              },
              "&::after": {
                display: "none",
              },
            }}
            onChange={(e) => props.handleImage(e)}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Avatar
            src={props.file === -1 ? "" : props.fileUrl}
            sx={{
              height: deviceStruct("4rem", "4rem", "4.5rem", "5rem", "5rem"),
              width: deviceStruct("4rem", "4rem", "4.5rem", "5rem", "5rem"),
              ml: deviceStruct(".5rem", "5rem", "2rem", "3rem", "3rem"),
              fontSize: "2rem",
              mr: "1rem",
            }}
          >
            <img src={ImagePlaceholder.src} />
          </Avatar>
          <Box sx={{ pr: ".5rem" }}>
            <Box
              sx={{
                color: "text.primary",
                fontSize: deviceStruct(
                  ".8rem",
                  ".8rem",
                  ".9rem",
                  "1rem",
                  "1rem"
                ),
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
                    fileInput?.click();
                  }}
                >
                  browse
                </Box>
              )}
            </Box>
            <Box
              sx={{
                color: "text.secondary",
                fontSize: deviceStruct(
                  ".7rem",
                  ".7rem",
                  ".8rem",
                  ".9rem",
                  ".9rem"
                ),
              }}
            >
              {props.file === undefined || props.file === -1
                ? "File Max size 1Mb. Dimensions 48px by 48px."
                : bytesToSize(props.file.size)}
            </Box>
            {props.file === -1 && (
              <Box sx={{ color: "red", fontWeight: 500 }}>
                File size too large.
              </Box>
            )}
            {props.file !== undefined && props.file !== -1 && (
              <Button
                variant="contained"
                size="small"
                sx={{ mt: ".5rem" }}
                onClick={() => {
                  const fileInput = document.getElementById(props.id);
                  fileInput?.click();
                }}
              >
                Replace
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default FileInput;
