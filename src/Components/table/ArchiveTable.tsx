import React, { useState } from "react";
import { Paragraph } from "../ui/paragraph/paragraph";
import Button from "../ui/button/Button";
import trusttLogo from "../../assets/logo/trustt-logo.svg";
import searchButton from "../../assets/icons/Button-search.svg";
import timer from "../../assets/icons/timer.svg";
import eyeIcon from "../../assets/icons/eye.svg";
import SpeedIcon from "@mui/icons-material/Speed";
import { Avatar, Badge, TablePagination } from "@mui/material";
// import MessageIcon from "../../assets/icons/Message.svg";
import { SessionData } from "../../Config/Store/Slices/reducers/homepage_reducers/activesessions_reducer";
// import CallingIcon from "../../assets/icons/callIcon.svg";

import MessageIcon from "../../assets/icons/messageicon.svg";
import CallingIcon from "../../assets/icons/callIcon.svg";

export default function ArchiveTable({
  tableData,
  handleClickRow,
}: {
  tableData: SessionData[];
  handleClickRow: any;
}) {
  // Add these lines before the return statement
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Calculate the index of the last record to display on the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tableData.slice(indexOfFirstRecord, indexOfLastRecord);

  // const pageNumbers = Math.ceil(tableData.length / recordsPerPage);
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

  const handleClick = () => {};

  return (
    <div className="overflow-hidden	">
      <div className="sm:flex  items-center bg-white justify-between  w-full   mt-2">
        <div className="flex items-center py-2 px-1 ">
          <Paragraph className="text-xs  font-bold text-color-heading">
            Conversation
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
      <div className="block 	w-80	overflow-x-auto  min-w-full  ">
        <table className="items-center mx-1   bg-transparent w-full border-collapse rounded-xl">
          <thead className=" rounded-xl">
            <tr className="rounded-lg bg-white uppercase border-b">
              <th className="px-1 flex justify-between  font-bold rounded-l-xl  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                <div>Name</div>

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
              </th>
              <th className="px-6  text-center font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Status
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
              </th>
              <th className="px-6   font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Session timming
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
              </th>
              <th className="px-6   font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Talk Time
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
              </th>

              <th className="px-6  font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                HOLD TIME
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
              </th>
              <th className="px-6  font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Feedback Score
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
              </th>
              <th className="px-6  font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Category
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
              </th>
              <th className="px-6  font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap font-semibold text-left">
                Date & Time
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
              </th>

              <th className="px-6 fixed-last-column bg-white rounded-r-xl font-bold  text-table-head align-middle  py-3 text-xs  whitespace-nowrap text-left">
                Transcript/ Summary
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.map((val, key) => (
              <tr key={key} className="border-b px-1">
                <td
                  onClick={handleClickRow}
                  className="border-t-0 cursor-pointer px-1 align-middle border-l-0 border-r-0  text-xs whitespace-nowrap p-4 text-left text-blueGray-700 "
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
                  <div className="flex-shrink-0">
                    <p className="text-xs text-gray-400 bg-sky-50 p-1  rounded-full truncate dark:text-gray-400">
                      <img
                        className="inline-block w-3 h-3 rounded-full mr-1 "
                        src={timer}
                        alt="Call"
                      />
                      <span className="text-sky-600 font-semi">
                        {val.existing_session?.talk_time}
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
                  <div className="flex-shrink-0 w-16">
                    <p className="text-xs text-gray-400 bg-green-50 p-1  rounded-full truncate dark:text-gray-400">
                      <SpeedIcon
                        fontSize={"small"}
                        className="mx-1 text-green-600"
                      />

                      <span className="text-green-600 font-semi">
                        {val.existing_session?.feedback}
                      </span>
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

                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center ">
                    <p className=" font-semi text-gray-900 truncate dark:text-white">
                      {val.existing_session.session_start_time}
                    </p>
                  </div>
                </td>

                <td className="fixed-last-column bg-white border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center ">
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
        </table>
      </div>
      <div className="flex items-center justify-end mt-4">
        <TablePagination
          component="div"
          count={tableData.length}
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
  );
}

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
        </div> */
}
{
  /* <div className="flex items-center space-x-2">
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
// import { SupervisiorTab } from "@/components/ui/supervisor-tab/supervisior_tab";
// import Image from "next/image";
// import { useNavigate } from "react-router-dom";
// import { SupervisiorTab } from "../ui/supervisor-tab/supervisior_tab";

// import doubleArrow from "../../assets/icons/double_arrow_left.svg";
// import ArrowLeftIcon from "../../assets/icons/arrow_left.svg";
// import ArrowRightIcon from "../../assets/icons/arrow_right.svg";
// import DoubleArrowRight from "../../assets/icons/double_arrow_right.svg";

// const [active, setActive] = useState(false);
// const [activeClass, setActiveClass] = useState("customers");

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

// const addActiveClass = (url_type: string) => {
//   setActiveClass(url_type);
// };
