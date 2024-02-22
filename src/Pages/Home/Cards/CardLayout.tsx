import {  Grid, Typography } from "@mui/material";
import React from "react";

type Props = {
  children: any;
  title: string;
};

const CardLayout = ({ children, title }: Props) => {
  return (
    <Grid
      xs={2.8}
      md={2.9}
      item
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        padding: 1,
        paddingX: 2,
      }}
    >
      <Typography sx={{ fontWeight: 600, marginBottom: 1}}>
        {title}
      </Typography>
      {children}
    </Grid>
  );
};

export default CardLayout;
