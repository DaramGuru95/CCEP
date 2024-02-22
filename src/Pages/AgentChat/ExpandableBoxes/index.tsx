import { Box, Typography } from "@mui/material";
import ExpandableCustomWindow from "../../../Components/ui/ui/agentCoPilot/ExpandableCustomWindow";
import AdharMasking from "../../../assets/icons/adhar_masking.svg";
import TicketIcon from "../../../assets/icons/ticketing.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import CustHistoryIcon from "../../../assets/icons/cust_history.svg";
import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";
// import SearchIcon from "../../../assets/icons/Search.svg";
import SearchIcon from "../../../assets/images/SearchIcon.png";
import FilterAlt from "../../../assets/icons/fliteralt.svg";
import { Customer360Modal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/customer360_reducers";
import { CustConvHistoryModal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/custConvHistory_reducers";
import { formatDate, setLocalStorage } from "../../../Helpers/commonHelper";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Config/Store";
import { ticketHistoryObj } from "../../Tickets/Components/TicketHistoryInformation/ActivitySidebar";
import { useDispatch } from "react-redux";
import { getCurrentTicketDetailsAction } from "../../../Config/Store/Slices/actions/ticket_actions/ticket_actions";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { dateFormat } from "../../../Helpers/dateUtils";
import dayjs from "dayjs";

const ExpandableBoxes = ({
  customer360,
  custConvHistory,
}: // ticketHistory,
{
  customer360: Customer360Modal;
  custConvHistory: CustConvHistoryModal[];
  // ticketHistory: any;
}) => {
  // console.log(ticketHistory, "ticketHistory");

  const { data } = useSelector((state: RootState) => state.tickets);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickRow = (
    type: string,
    status: string,
    customer_id: string,
    conv_session_id: string | null,
    showTranscript?: string | null
  ) => {
    setLocalStorage("agent_page", type);
    setLocalStorage("agent_page_status", status);
    setLocalStorage("selected_customer", customer_id);
    setLocalStorage("conv_session_id", conv_session_id);
    setLocalStorage("showTranscript", showTranscript);
    navigate("/agent-console", {
      state: { type, status, customer_id, conv_session_id, showTranscript },
    });
  };

  const expectedResolutionFormat = (date: any, tat: any) => {
    let formatteddate = date;
    let formatDate = "";
    if (tat === "24 hours" || tat === "24 Hours") {
      formatteddate = dayjs(date).add(1, "days");
      formatDate = dateFormat(formatteddate);
      return formatDate;
    } else if (tat === "48 hours" || tat === "48 Hours") {
      formatteddate = dayjs(date).add(2, "days");
      formatDate = dateFormat(formatteddate);
      return formatDate;
    }
    return formatDate;
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={"100vh"}
      gap={1}
      sx={{ overflowY: "auto", overflowX: "hidden", OverflowY: "scroll" }}
    >
      <ExpandableCustomWindow
        leftIcon={AdharMasking}
        windowTitle={"Customer 360"}
        righticon={KababVerticalIcon}
      >
        <Box
          width={"100%"}
          sx={{
            background: "#f5f6fb",
            padding: 1,
            borderRadius: 2,
            overflowY: "auto",
            height: "39vh",
          }}
        >
          <div className="w-full text-xs ">
            <p className="font-semibold text-base text-color-heading">
              Customer Details
            </p>
            <div className="text-color-heading font-medium grid grid-cols-2 gap-2">
              <p className="font-semibold mt-1 text-color-heading font-medium">
                Customer Name :
              </p>
              <p>
                {" " + customer360?.first_name + " " + customer360?.last_name}
              </p>
              <p className="font-semibold text-color-heading font-medium">
                Customer Id :
              </p>
              <p>{customer360?.customer_id}</p>
              <p className="font-semibold text-color-heading font-medium">
                Date of Birth :
              </p>
              <p>{moment(customer360?.dob).format("DD MMM YYYY")}</p>
              <p className="font-semibold text-color-heading font-medium">
                Mother Maiden Name :
              </p>
              <p>{customer360?.mother_name}</p>
              <p className="font-semibold text-color-heading font-medium">
                Customer Education :
              </p>
              <p>{customer360?.education}</p>

              <p className="font-semibold text-color-heading font-medium">
                Customer Email :
              </p>
              <p> {customer360?.email}</p>

              <p className="font-semibold text-color-heading font-medium">
                Customer Marital Status :
              </p>
              <p>{customer360?.marital_status}</p>

              <p className="font-semibold text-color-heading font-medium">
                Customer Occupation :
              </p>
              <p>{customer360?.occupation}</p>

              <p className="font-semibold text-color-heading font-medium">
                Customer Mobile :
              </p>
              <p> {customer360?.phone_no}</p>

              <p className="font-semibold text-color-heading font-medium">
                Customer Gender :
              </p>
              <p>{customer360?.gender}</p>
            </div>
          </div>
        </Box>
      </ExpandableCustomWindow>
      <ExpandableCustomWindow
        leftIcon={TicketIcon}
        windowTitle={"Ticketing History"}
        righticon={FilterAlt}
        righticon2={SearchIcon}
      >
        {/* <Box width={"100%"} sx={{ background: "white", padding: 1 }}>
          <div className="">
            {data &&
              data?.tickets?.map((ticket: any, key: any) => (
                <div
                  className="mb-2 rounded-lg p-2"
                  style={{ background: "#f5f6fb" }}
                >
                  <div className="flex flex-row text-xs justify-between">
                    <p className="">
                      <span className="text-sky-600 font-semibold">
                       {`#${ticket.ticket_no}`}
                      </span>{" "}
                      <span className="bg-yellow-100 text-amber-600 px-1 mx-1 rounded-full">
                        {formatDate(ticket["created_on"])}
                      </span>
                    </p>
                    <p className="text-black capitalize font-semibold px-1 bg-gray-200 rounded-full">
                      {ticket["status"]}
                    </p>
                  </div>
                  <p className="font-bold text-xs my-2">
                    Category:{" "}
                    <span className="font-normal ">{ticket["category"]}</span>
                  </p>
                  <p className="font-semibold w-fit text-sky-600 bg-white rounded full text-xs px-2">
                    Close date
                    <span className="font-normal"> - 22 Nov 23</span>{" "}
                    <span className="font-normal ">| 11:20 am</span>
                  </p>
                </div>
              ))}
          </div>
        </Box> */}
        <Box sx={{ height: "39vh", overflowY: "auto" }}>
          {data &&
            data?.tickets?.map((item: any, key: any) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    background: "#F5F6FB",
                    borderRadius: 2,
                    m: 1,
                    p: 0.5,
                    // height: "100%",
                  }}
                  // to={`/tickets/${item.ticket_id}`}
                  onClick={() => {
                    dispatch(getCurrentTicketDetailsAction(item));
                    navigate(`/tickets/${item.ticket_id}`);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={"bold"}
                        color={"#0096C5"}
                        fontSize={"0.85rem"}
                      >
                        {`#${item.ticket_id}`}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          display: "flex",
                          fontWeight: 600,
                          color: "#FAAA49",
                          background: "#FEF3D6",
                          borderRadius: 2,
                          fontSize: "0.7rem",
                          width: "5rem",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 2,
                        }}
                      >
                        {dateFormat(item.created_on)}
                      </Typography>
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "flex",
                        // background: "#EBF9EF",
                        // color: "#00875F",
                        borderRadius: 2,
                        width: "4rem",
                        justifyContent: "center",
                        fontWeight: 600,
                        background:
                          item.status === "CLOSED"
                            ? "#EBECF1"
                            : item.status === "OPEN"
                            ? "#EBF9EF" // Assuming you want a different color for "Open"
                            : "#FFFFFF", // Default color if neither "Closed" nor "Open"
                        color:
                          item.status === "CLOSED"
                            ? "#111827"
                            : item.status === "OPEN"
                            ? "#00875F" // Assuming you want a different color for "Open"
                            : "#000000", // Default color if neither "Closed" nor "Open"
                      }}
                    >
                      {item.status}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                      fontSize: "0.7rem",
                    }}
                  >
                    <div className="flex gap-1">
                      <Typography fontSize="0.85rem" fontWeight={"bold"}>
                        {"Category:"}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontSize="13px"
                        fontWeight={500}
                      >
                        {item.category}
                      </Typography>
                    </div>

                    <Typography
                      variant="caption"
                      fontSize="13px"
                      color="#0096C5"
                      sx={{
                        background: "#fff",
                        borderRadius: 2,
                        pl: 1,
                        m: 0.3,
                      }}
                    >
                      {`Expected Resolution - ${expectedResolutionFormat(
                        item.created_on,
                        item.tat
                      )} `}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </ExpandableCustomWindow>
      <ExpandableCustomWindow
        leftIcon={CustHistoryIcon}
        windowTitle={"Customer Conversation History"}
        righticon={SearchIcon}
      >
        <Box sx={{ height: "39vh", overflowY: "auto" }}>
          {custConvHistory?.map((val, index) => (
            <Box
              onClick={() => {
                setLocalStorage("showTranscript", "showTranscript");
                handleClickRow(
                  "CHAT",
                  "CLOSED",
                  "",
                  val.conv_session_id,
                  "showTranscript"
                );
                // navigate("/agent-console", {
                //   state: {
                //     type: `"CHAT"`,
                //     status: `"CLOSED`,
                //     conv_session_id: val?.conv_session_id,
                //     showTranscript: "showTranscript",
                //   },
                // });
              }}
              key={index}
              sx={{
                background: "#F5F6FB",
                borderRadius: 2,
                m: 1,
                p: 0.5,
              }}
            >
              <div className="w-fit text-xs  ">
                <p className="font-normal rounded-full truncate p-1 bg-yellow-100 text-amber-600">
                  {val?.time}
                </p>
              </div>

              <p className="font-bold text-xs my-2">
                Category: <span className="font-normal ">{val?.category}</span>
              </p>
              <p className="font-bold text-xs my-2">
                Agent:{" "}
                <span className=" underline text-sky-600">
                  {val?.agent_name}
                </span>
              </p>
            </Box>
          ))}
        </Box>
      </ExpandableCustomWindow>
    </Box>
  );
};

export default ExpandableBoxes;
