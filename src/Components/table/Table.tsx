import React, { useMemo, useState } from "react";
import { SupervisiorTab } from "../ui/supervisor-tab/supervisior_tab";
import { Paragraph } from "../ui/paragraph/paragraph";
// import Button from "../ui/button/Button";
// import trusttLogo from "../../assets/logo/trustt-logo.svg";
import searchButton from "../../assets/icons/Button-search.svg";
import timer from "../../assets/icons/timer.svg";
// import eyeIcon from "../../assets/icons/eye.svg";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  TablePagination,
  Typography,
} from "@mui/material";
import MessageIcon from "../../assets/icons/messageicon.svg";
import CallingIcon from "../../assets/icons/callIcon.svg";
import { SessionData } from "../../Config/Store/Slices/reducers/homepage_reducers/activesessions_reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../Config/Store";
import { agentColumns, supervisorColumns } from "./columnDefs";
import CustomChip from "../../Common/CustomChip";
import FeedBack from "../../assets/images/FeedBack.png";

export default function Table({
  tabs,
  tableData,
  handleClickRow,
}: {
  tabs: Array<any>;
  tableData: SessionData[];
  handleClickRow: any;
}) {
  const [active, setActive] = useState(false);
  const [activeClass, setActiveClass] = useState("customers");
  // Add these lines before the return statement
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  // Calculate the index of the last record to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tableData?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const { designation } = useSelector((state: RootState) => state.appState);

  const tableTitle = useMemo(() => {
    if (designation === "SUPERVISOR") {
      return "List of Agents";
    } else if (designation === "AGENT") {
      return "Conversations";
    }
  }, [designation]);

  const columns = useMemo(() => {
    if (designation === "SUPERVISOR") {
      return supervisorColumns;
    } else if (designation === "AGENT") {
      return agentColumns;
    }
  }, [designation]);

  // const handleClick = () => {};

  const addActiveClass = (url_type: string) => {
    setActiveClass(url_type);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };
  return (
    <div className=" mt-2.5  space-y-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div className="bg-white  py-1 md:py-3 px-1 md:px-2 xl:px-2 rounded-lg">
        <div className="sm:flex items-center bg-white justify-between  w-full border-b">
          <div className="flex items-center  ">
            {tabs.map((val, key) => (
              <SupervisiorTab
                name={val.name}
                url_type={val.url_type}
                bedge={val.bedge}
                index={key}
                active={activeClass === "" && active}
                setActive={setActive}
                activeClass={activeClass === val.url_type}
                addActiveClass={addActiveClass}
              />
            ))}
          </div>
        </div>
        <div className="sm:flex items-center bg-white justify-between  w-full  mt-2">
          <div className="flex items-center py-2 px-1 ">
            <Paragraph className="text-xs  font-bold text-color-heading">
              {tableTitle}
            </Paragraph>
          </div>
          <div className="flex flex-row">
            <button>
              <img
                src={searchButton}
                alt=""
                className="mx-2"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
        <div className="block w-full overflow-x-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          <table className="items-center bg-transparent w-full border-collapse rounded-xl">
            <thead className=" rounded-xl">
              <tr className="rounded-lg bg-white uppercase border-b">
                {columns?.map(({ id, label }: any, index) => (
                  <th
                    key={index}
                    className=" font-bold rounded-l-xl  text-table-head   py-3 text-xs  whitespace-nowrap font-semibold text-left"
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                    >
                      <div>{label}</div>

                      <button className="">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </button>
                    </Box>
                  </th>
                ))}
              </tr>
            </thead>

            {designation === "AGENT" && (
              <tbody>
                {currentRecords?.map((val, key) => (
                  <tr key={key} className="border-b">
                    {/* val.existing_session.channel_subtype */}
                    <td
                      onClick={() => {
                        if (val.existing_session.status == "ACTIVE") {
                          handleClickRow(
                            val.existing_session.channel_subtype,
                            val.existing_session.status,
                            val.existing_session.customer_id,
                            val.existing_session.conv_session_id
                          );
                        }
                      }}
                      className="border-t-0 cursor-pointer px-6 align-middle border-l-0 border-r-0  text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
                    >
                      <div className="flex items-center ">
                        <Badge
                          sx={{
                            ".MuiBadge-badge": {
                              padding: "0 2px",
                            },
                          }}
                          badgeContent={
                            val.existing_session.channel_subtype === "CHAT" ? (
                              <img src={MessageIcon} alt="Message Icon" />
                            ) : (
                              <img src={CallingIcon} alt="Calling Icon" />
                            )
                          }
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            // src={trusttLogo}
                            sx={{
                              height: 32,
                              width: 32,
                              bgcolor: key % 2 === 0 ? "#74dbd5" : "#ffcc80",
                            }}
                          >
                            {val.customer_details.first_name[0]}
                          </Avatar>

                          {/* <img
                          className="w-8 h-8 rounded-full"
                          src={trusttLogo}
                          alt="User Logo"
                        /> */}
                        </Badge>

                        <div className="flex-1 ms-2 text-xs">
                          <p className="  text-cyan-500	 underline truncate dark:text-white">
                            {val.customer_details.first_name +
                              " " +
                              val.customer_details.last_name}
                          </p>
                          <p className="fs-8 text-gray-color">AL7436</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                      <div className="flex-shrink-0">
                        <div className="flex-1 flex justify-center ms-2 text-xs">
                          <p
                            className={`text-xs py-2 px-3 text-center  rounded-full truncate dark:text-gray-400 ${
                              val.existing_session.status === "ACTIVE" &&
                              "bg-sky-100 text-sky-600"
                            } ${
                              val.existing_session.status === "CLOSED" &&
                              "bg-green-100 text-green-600"
                            } ${
                              val.existing_session.status === "TRANSFERRED" &&
                              "bg-yellow-100 text-yellow-600"
                            }`}
                            style={{ width: "fit-content" }}
                          >
                            {val.existing_session.status}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 flex items-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex-shrink-0">
                        <p className="text-xs text-gray-400 bg-sky-50 p-1  rounded-full truncate dark:text-gray-400">
                          <img
                            className="inline-block w-3 h-3 rounded-full mr-1 "
                            src={timer}
                            alt="Call"
                          />
                          <span className="text-sky-600 font-semi">
                            {val.existing_session.session_duration}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex-shrink-0 flex justilfy-center ms-2">
                        <p
                          style={{ width: "fit-content" }}
                          className="text-xs text-center  text-gray-400 bg-sky-50 p-1  rounded-full truncate dark:text-gray-400"
                        >
                          <img
                            className="inline-block w-3 h-3 rounded-full mr-1 "
                            src={timer}
                            alt="Call"
                          />
                          <span className="text-sky-600 font-semi">-</span>
                        </p>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center ">
                        <p className=" font-semi text-gray-900 truncate dark:text-white">
                          {val.existing_session.channel}
                        </p>
                      </div>
                    </td>
                    <td className=" border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center justify-center">
                        {(val.existing_session.status == "CLOSED" ||
                          val.existing_session.status == "TRANSFERRED") && (
                          <button
                            className="text-sky-600 underline font-semibold"
                            onClick={() =>
                              handleClickRow(
                                val.existing_session.channel_subtype,
                                val.existing_session.status,
                                val.existing_session.customer_id,
                                val.existing_session.conv_session_id,
                                "showTranscript"
                              )
                            }
                          >
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}

            {designation === "SUPERVISOR" && (
              <tbody>
                {tableData?.map((row: any) => (
                  <tr key={row.agent_id}>
                    <td className="border-t-0 cursor-pointer px-6 align-middle border-l-0 border-r-0  text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                      <div className="flex items-center ">
                        <Badge
                          sx={{
                            ".MuiBadge-badge": {
                              padding: "0 2px",
                            },
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            // src={trusttLogo}
                            sx={{
                              height: 32,
                              width: 32,
                            }}
                          >
                            {row.first_name[0]}
                          </Avatar>

                          {/* <img
                          className="w-8 h-8 rounded-full"
                          src={trusttLogo}
                          alt="User Logo"
                        /> */}
                        </Badge>

                        <div className="flex-1 ms-2 text-xs">
                          <p className="  text-cyan-500	 underline truncate dark:text-white">
                            {row.first_name + " " + row.last_name}
                          </p>
                          <p className="fs-8 text-gray-color">AL7436</p>
                        </div>
                      </div>
                    </td>

                    <td
                      align="center"
                      className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      <Box
                        width={"100%"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                      >
                        <CustomChip
                          label={
                            +row?.availability ? "Available" : "Unavailable"
                          }
                          color={+row?.availability ? "#00875F" : "#F99F35"}
                          backgroundColor={
                            +row?.availability ? "#EBF9EF" : "#FEF3D6"
                          }
                        />
                      </Box>
                    </td>
                    <td
                      align="center"
                      className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      <CustomChip
                        label={row?.average_conv_duration}
                        color={"#00769B"}
                        backgroundColor={"#F3FAFC"}
                      />
                    </td>
                    <td
                      align="center"
                      className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                    >
                      <CustomChip
                        label={row?.average_conv_duration}
                        color={"#00769B"}
                        backgroundColor={"#F3FAFC"}
                      />
                    </td>
                    <td
                      align="center"
                      className="border-t-0 px-6 flex align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                      style={{ justifyContent: "center" }}
                    >
                      {/* <img
                        style={{
                          height: "10px",
                          width: "10px",
                        }}
                        src={FeedBack}
                        alt="Feedback"
                      /> */}
                      <CustomChip
                        label={row?.average_feedback}
                        color={"#00875F"}
                        backgroundColor={"#EBF9EF"}
                      />
                    </td>
                    <td>
                      <Box sx={{ display: "flex", gap: 0.6, paddingLeft: 4 }}>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >{`Total - ${row.no_of_convs} `}</Typography>
                        <Typography
                          sx={{ fontSize: "12px", paddingTop: 0.3 }}
                        >{` | Chat - ${row.no_of_chat}`}</Typography>
                        <Typography
                          sx={{ fontSize: "12px", paddingTop: 0.3 }}
                        >{` | Call - ${row.no_of_call}`}</Typography>
                        <Divider orientation="vertical" />
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="flex items-center  justify-end mt-4">
            <TablePagination
              component="div"
              count={tableData?.length}
              page={currentPage - 1}
              onPageChange={handleChangePage}
              rowsPerPage={recordsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              showFirstButton={true}
              labelRowsPerPage={"Rows Per Page"}
              showLastButton={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// const pageNumbers = Math.ceil(tableData.length / recordsPerPage);

// const handlePageChange = (pageNumber: any) => {
//   setCurrentPage(pageNumber);
// };

// const goToFirstPage = () => {
//   setCurrentPage(1);
// };

// const goToLastPage = () => {
//   setCurrentPage(pageNumbers);
// };

// const router = useNavigate();

{
  /* <div className="flex items-center space-x-2">
              <select
                className="py-1 px-2 border rounded-md text-xs"
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                value={recordsPerPage}
              >
                {Array.from(
                  { length: Math.min(tableData.length, 50) },
                  (_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  )
                )}
              </select>
              <span className="text-xs text-gray-600">
                rows per page
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <ul className="flex space-x-2">
                <li>
                  <button
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className={`text-xs h-6 flex items-center justify-center  focus:outline-none ${"bg-white text-gray-700 cursor-pointer"}`}
                  >
                    <img
                      src={doubleArrow}
                      alt="asodk"
                      width={12}
                      height={12}
                      className="mr-1"
                    />
                    First
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`text-xs w-6 h-6 flex items-center justify-center  focus:outline-none ${"bg-white text-gray-700 cursor-pointer"}`}
                  >
                    <img
                      src={ArrowLeftIcon}
                      alt="asodk"
                      width={12}
                      height={12}
                      // className="mr-1"
                    />
                  </button>
                </li>
                {Array.from({ length: pageNumbers }, (_, index) => (
                  <li key={index}>
                    <button
                      key={index}
                      className={`text-xs w-6 h-6 flex items-center justify-center border border-gray-300 rounded-full focus:outline-none ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers}
                    className={`text-xs w-6 h-6 flex items-center justify-center  focus:outline-none ${"bg-white text-gray-700 cursor-pointer"}`}
                  >
                    <img
                      src={ArrowRightIcon}
                      alt="asodk"
                      width={12}
                      height={12}
                      // className="mr-1"
                    />
                  </button>
                </li>
                <li>
                  <button
                    onClick={goToLastPage}
                    disabled={currentPage === pageNumbers}
                    className={`text-xs  h-6 flex items-center justify-center  focus:outline-none ${"bg-white text-gray-700 cursor-pointer"}`}
                  >
                    Last
                    <img
                      src={DoubleArrowRight}
                      alt="asodk"
                      width={12}
                      height={12}
                      className="ml-1"
                    />
                  </button>
                </li>
              </ul>
            </div> */
}
