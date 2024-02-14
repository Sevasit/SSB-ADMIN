import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { color } from "chart.js/helpers";
type Props = {
  fields: string[];
  fileName: string;
};

const PrintCsvOnly = (props: Props) => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        style={{
          color: "black",
          backgroundColor: "#00DC82",
          margin: "5px",
        }}
        csvOptions={{
          fileName: props.fileName,
          fields: props.fields,
          utf8WithBom: true,
        }}
        printOptions={{ disableToolbarButton: true }}
      />
    </GridToolbarContainer>
  );
};

export default PrintCsvOnly;
