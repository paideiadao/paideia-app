import { Header } from "@components/creation/utilities/HeaderComponents";
import { Box } from "@mui/material";
import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { currencyFormatter } from "@components/utilities/currency";
import { deviceWrapper } from "@components/utilities/Style";

const columns: GridColDef[] = [
  {
    field: "source",
    headerName: "Source",
    width: 125,
    sortable: true,
  },
  {
    field: "pairs",
    headerName: "Pairs",
    width: 125,
  },
  {
    field: "price",
    headerName: "Price",
    width: 125,
    sortable: true,
    align: "left",
    headerAlign: "left",
    valueGetter: (params: GridValueGetterParams) =>
      currencyFormatter(params.row.price, 4) + " ERG",
  },
  {
    field: "volume",
    headerName: "Volume",
    width: 125,
    sortable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "liquidity",
    headerName: "Liquidity",
    width: 150,
    sortable: true,
    align: "left",
    headerAlign: "left",
  },
];

const Markets: React.FC<any> = (props) => {
  const ticker = props.ticker ?? props.data?.token_name ?? "Token";
  const rows =
    props.data?.token_markets.map((market: any, index: number) => {
      return {
        id: index,
        pairs: market.pair,
        source: market.source,
        price: market.price,
        volume: "N/A",
        liquidity: "N/A",
      };
    }) ?? [];
  return (
    <Box sx={{ width: "100%", mt: "1rem" }}>
      <Header title={`${ticker} Markets`} />
      <Box sx={{ mt: ".5rem" }} />
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        sx={{
          fontSize: ".8rem",
          ml: deviceWrapper("-1rem", "0"),
          mr: deviceWrapper("-1rem", "0"),
          pl: deviceWrapper(".25rem", "0"),
          pr: deviceWrapper(".25rem", "0"),
          "& .MuiDataGrid-cell": {
            backgroundColor: "fileInput.outer",
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "fileInput.outer",
          },
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
        }}
        hideFooter
      />
    </Box>
  );
};

export default Markets;
