import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Config/Store";
import TicketsTable from "./Components/TicketsHome/TicketsTable";
import { Box } from "@mui/material";
import { getTicketsAction } from "../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import TicketsHeader from "./Components/TicketsHome/TicketsHeader";
import { GridRowSelectionModel } from "@mui/x-data-grid";
// import { useSelector } from "react-redux";

const Tickets = () => {
  const dispatch: AppDispatch = useDispatch();
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  return (
    <Box
      width={"100%"}
      sx={{ display: "flex", gap: 1, flexDirection: "column" }}
    >
      <TicketsHeader rowSelectionModel={rowSelectionModel} />
      <TicketsTable
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
      />
    </Box>
  );
};

export default Tickets;
