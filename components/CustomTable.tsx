import React, { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  useMediaQuery,
} from "@mui/material";
import { IObj } from "@lib/Interfaces";

interface HeadingData {
  id: string;
  name: string;
  align?: "center" | "inherit" | "justify" | "left" | "right";
}

interface ITableProps {
  heading: HeadingData[];
  rows: IObj<number | string>[];
}

const CustomTable: FC<ITableProps> = ({ rows, heading }): JSX.Element => {
  const [thisNavigator, setThisNavigator] = useState("en-US");

  useEffect(() => {
    setThisNavigator(navigator.language);
  }, []);

  const checkSmall = useMediaQuery("(min-width:700px)");

  return (
    <TableContainer
      sx={{
        border: "2px solid rgba(255, 255, 255, 0.12)",
        borderRadius: checkSmall ? "8px" : "0",
        overflowX: "auto",
        width: checkSmall ? "100%" : "100vw",
        maxWidth: "100vw",
        ml: checkSmall ? "0" : "-24px",
        // mr: checkSmall ? '0' : '-48px',
      }}
    >
      <Table
        aria-label="customized table"
        sx={{
          position: "sticky",
          top: "0",
          width: "100%",
          "& tr:last-child": {
            border: "none",
          },
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: "rgba(30, 36, 49, 0.7)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12) !important",
            }}
          >
            {heading.map((heading) => {
              return (
                <TableCell
                  key={heading.id}
                  align={heading.align ? heading.align : "left"}
                  sx={{
                    border: "none",
                    fontWeight: "700",
                    letterSpacing: "1px",
                  }}
                >
                  {heading.name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            return (
              <TableRow
                key={i}
                sx={{
                  background: "rgba(19,26,39,0.7)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                  "&:nth-of-type(odd)": {
                    background: "rgba(10,18,31,0.7)",
                  },
                  // hide last border
                  "&:last-child td, &:last-child th": {
                    borderBottom: "none",
                  },
                }}
              >
                {Object.keys(row).map((key, i) => {
                  return (
                    <TableCell key={key} sx={{ border: "none" }}>
                      {row[key].toLocaleString(thisNavigator, {
                        maximumFractionDigits: 0,
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
