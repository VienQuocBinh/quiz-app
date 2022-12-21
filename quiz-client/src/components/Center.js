import { Grid } from "@mui/material";
import React from "react";
export default function Center(props) {
  return (
    /*
        container: is container of Grid
        item: is the column of the Grid
    */
    <Grid
      container
      direction={"column"}
      alignItems="center"
      justifyContent={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={1}>
        {props.children}
      </Grid>
    </Grid>
  );
}
