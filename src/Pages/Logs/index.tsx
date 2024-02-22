import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Badge } from "@mui/material";
import MessageIcon from "../../assets/icons/Message.svg";
import trusttLogo from "../../assets/logo/trustt-logo.svg";
import Button from "../../Components/ui/button/Button";
import eyeIcon from "../../assets/icons/eye.svg";
import TablePagination from "@mui/material/TablePagination";

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  price: string
) {
  return {
    name,
    calories,
    fat,
    carbs,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}
const tableData = [
  {
    name: "Sumit Chansoriya",
    status: "In Progress",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Completed",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
  {
    name: "Sumit Chansoriya",
    status: "Chatting",
    category: "Enquiry",
    session_timming: "02:20 min",
    channel: "Whatsapp",
    action: "normal_chat",
  },
];
const rowsPerPageOptions = [5, 10, 25];

function Row(props: any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          background: "#d6eef6",
        }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box maxHeight={400} sx={{ overflowY: "auto" }}>
              <table className="items-center  bg-transparent w-full border-collapse rounded-xl">
                <thead className=" rounded-xl">
                  <tr className="rounded-lg bg-white uppercase border-b">
                    <th className="px-6 flex justify-between  font-bold rounded-l-xl  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                      <div>Customer Name</div>
                    </th>
                    <th className="px-6  text-center font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                      Channel
                    </th>
                    <th className="px-6   font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                      Category
                    </th>
                    <th className="px-6  font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                      No. Of Ticket Raised
                    </th>

                    <th className="px-6  rounded-r-xl font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableData.map((val, key) => (
                    <tr key={key} className="border-b">
                      <td className="border-t-0 cursor-pointer px-6 align-middle border-l-0 border-r-0  text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        <div className="flex items-center ">
                          <Badge
                            sx={{
                              ".MuiBadge-badge": {
                                padding: "0 2px",
                              },
                            }}
                            badgeContent={<img src={MessageIcon} />}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <img
                              className="w-8 h-8 rounded-full"
                              src={trusttLogo}
                              alt="User Image"
                            />
                          </Badge>

                          <div className="flex-1 ms-2 text-xs">
                            <p className=" underline truncate dark:text-white">
                              {val.name}
                            </p>
                            <p className="fs-8 text-gray-color">AL7436</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <div className="flex-shrink-0">
                          <div className="flex-1 ms-2 text-xs">
                            <p
                              className={`text-xs p-1 text-center  rounded-full truncate dark:text-gray-400 text-black`}
                            >
                              {val.channel}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="border-t-0 px-6 flex items-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex-shrink-0">
                          <p className="text-xs text-gray-400  rounded-full truncate dark:text-gray-400">
                            <span className="text-black font-semi">
                              {val.channel}
                            </span>
                          </p>
                        </div>
                      </td>

                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center ">
                          <p className=" font-semi text-cyan-600 underline truncate dark:text-white">
                            {val.channel}
                          </p>
                        </div>
                      </td>

                      <td className=" border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center ">
                          {val.status == "Completed" && (
                            <Button
                              name={"View"}
                              // handleClick={() => {}}
                              className="inline-block rounded fs-10 py-1 px-2 bg-gray-100 leading-normal border text-black   hover:bg-primary-600"
                              // handleClick={handleClick}
                            >
                              <img
                                src={eyeIcon}
                                alt=""
                                className="inline-block mr-1"
                              />
                              View
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.string.isRequired,
    carbs: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
  createData("07/11/23", "159", "03:20 minute", "24 hours", "4.5/10"),
];

export default function ViewLogs() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(
    rowsPerPageOptions[0]
  );

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total Cases</TableCell>
            <TableCell align="right">AVG. Handling Time</TableCell>
            <TableCell align="right">Total Time</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {slicedRows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        labelRowsPerPage={"Rows Per Page"}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton={true}
        showLastButton={true}
      />
    </TableContainer>
  );
}
