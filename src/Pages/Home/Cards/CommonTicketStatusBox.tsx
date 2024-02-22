import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactNode, useMemo } from "react";

type Props = {
  primaryText: string | ReactNode;
  secondaryText: string | ReactNode;
  borderColor: string;
  boxfor: string;
};

const CommonTicketStatusBox = ({
  primaryText,
  secondaryText,
  borderColor,
  boxfor,
}: Props) => {
  const dynamicPadding = useMemo(() => boxfor === "status", [boxfor]);

  return (
    <Grid
      item
      xs={5.5}
      md={5.5}
      sx={{
        border: 2,
        borderColor: borderColor,
        borderRadius: 1,
        // height: "4.2rem",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingY={ 2}
      >
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontSize: 12,
              fontWeight: 400,
              color: "#4B5563",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {secondaryText}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: 600 }}>{primaryText}</Typography>
      </Box>
    </Grid>
  );
};

export default CommonTicketStatusBox;
