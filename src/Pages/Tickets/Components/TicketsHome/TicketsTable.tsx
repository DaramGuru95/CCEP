import * as React from "react";
import Box from "@mui/material/Box";

// import { Paper, TablePagination } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
// import { ticketDetails } from "./TicketDetailsObj";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getrowSelectionModel } from "../../../../Config/Store/Slices/reducers/ticket_reducers/getTicket_reducer";
import TicketDetailsCell from "./TabelCell/TicketDetailsCell";
import TicketStatusDetails from "./TicketStatusDetails";
import { getTicketsAction } from "../../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import { AppDispatch } from "../../../../Config/Store";
import { Paper } from "@mui/material";
import { getLocalStorage } from "../../../../Helpers/commonHelper";
// import { getTicketsAction } from "../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";

const renderTicketDetailsCell = ({ row }: any) => {
  return <TicketDetailsCell data={row} />;
};

const renderTicketStatus = ({ row }: any) => {
  return <TicketStatusDetails data={row} />;
};

type Props = {
  rowSelectionModel: GridRowSelectionModel;
  setRowSelectionModel: Function;
};

const TicketsTable = ({ rowSelectionModel, setRowSelectionModel }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: { tickets = [], isLoading },
  } = useSelector((state: any) => state.tickets);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 4,
    page: 0,
  });

  function getRowId(row: any) {
    return row.ticket_id;
  }

  const columns: GridColDef[] = [
    {
      field: "ticketDetails",
      renderCell: renderTicketDetailsCell,
      // colSpan:4,
      minWidth: 700,
      align: "left",
      // flex: 1,
    },
    {
      field: "ticketStatus",
      renderCell: renderTicketStatus,
      minWidth: 260,
      // flex: 0.3,
      // colSpan:3,
      align: "right",
    },
  ];

  const onRowSelectionModelChange = (
    newRowSelectionModel: GridRowSelectionModel
  ) => {
    setRowSelectionModel(newRowSelectionModel);
    dispatch(getrowSelectionModel(newRowSelectionModel));
  };

  React.useEffect(() => {
    const conv_session_id = getLocalStorage("conv_session_id");
    // console.log("conve sesssion id", conv_session_id);
    // if (!tickets?.length) {
    if (conv_session_id) dispatch(getTicketsAction(conv_session_id));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSortedTicketList = (data: any) => {
    return [...data];
    // return [...data].reverse();
  };

  console.log("Tickets data", tickets);
  return (
    <Box
      component={Paper}
      elevation={0}
      height={"auto"}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1.5,
        // border: "1px solid #fff",
      }}
      width={"100%"}
    >
      <DataGrid
        getRowId={getRowId}
        disableRowSelectionOnClick
        getRowHeight={() => 95}
        columns={columns}
        sx={{ border: "none" }}
        rows={tickets && tickets.length > 0 ? getSortedTicketList(tickets) : []}
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[4, 10, 25]}
        columnHeaderHeight={0}
        checkboxSelection
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
};

export default TicketsTable;
