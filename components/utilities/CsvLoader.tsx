import { Button } from "@mui/material";
import * as React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function csvToArray(str: string, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (
      object: { [index: string]: any },
      header,
      index
    ) {
      object[header.trim()] =
        values[index] === undefined
          ? undefined
          : header.trim() === "percentage"
          ? parseFloat(values[index].replace("\r", ""))
          : values[index].replace("\r", "");
      return object;
    },
    {});
    return el;
  });

  // return the array

  return arr.filter((i: any) => {
    let temp = true;
    Object.keys(i).forEach((key) => {
      if (i[key] === undefined) {
        temp = false;
      }
    });
    return temp;
  });
}

const CsvLoader: React.FC<{
  id: string;
  handleFile: Function;
}> = (props) => {
  return (
    <>
      <input
        type="file"
        accept=".csv"
        id={props.id}
        style={{ display: "none" }}
        onChange={(e) => {
          let fileInput = e.currentTarget.files;
          if (fileInput && fileInput[0]) {
            if (fileInput.length != 1) return;
            if (fileInput[0].size > 1000000) {
              return;
            }
            var reader = new FileReader();
            // do more work here to get the aliases & images from the database if there are any...
            reader.onload = function (e) {
              const text: any = e.target?.result;
              let data = csvToArray(text);
              props.handleFile(data);
            };

            reader.readAsText(fileInput[0]);
          }
        }}
      />
      <Button
        variant="text"
        onClick={() => {
          const fileInput = document.getElementById(props.id);
          fileInput?.click();
        }}
      >
        Add from file <FileUploadIcon />
      </Button>
    </>
  );
};

export default CsvLoader;
