import { Box } from "@mui/material";

import AdharMasking from "../../../assets/icons/adhar_masking.svg";
import TicketIcon from "../../../assets/icons/ticketing.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import CustHistoryIcon from "../../../assets/icons/cust_history.svg";
import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDate } from "../../../Helpers/commonHelper";

export const accordianObj = ({
  customer360,
  ticketHistory,
  custConvHistory,
}) => {
  return [
    {
      id: "customer_360",
      title: "Customer 360",
      icon: <img src={AdharMasking} alt="adhaar" height="40px" width="40px" />,
      actionIcon: <MoreVertIcon onClick={() => console.log("Clicked")} />,
      body: (
        <Box
          width={"100%"}
          sx={{
            background: "#f5f6fb",
            padding: 1,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <div className="w-full text-xs  ">
            <p className="font-semibold text-color-heading">Basic Details</p>
            <p className="mt-1 text-color-heading font-medium">
              Customer Name :
              {" " + customer360?.first_name + " " + customer360?.last_name}
            </p>
            <p className="text-color-heading font-medium">
              Account Number : {"Static"}
            </p>
            <p className="text-color-heading font-medium">
              Date of Birth : {customer360?.dob}
            </p>
            <p className="text-color-heading font-medium">
              Mother Maiden Name : {customer360?.mother_name}
            </p>
            <p className="text-color-heading font-medium">
              Customer Education : {customer360?.education}
            </p>
            <p className="text-color-heading font-medium">
              Customer Email : {customer360?.email}
            </p>
            <p className="text-color-heading font-medium">
              Customer Marital Status : {customer360?.marital_status}
            </p>
            <p className="text-color-heading font-medium">
              Customer Occupation : {customer360?.occupation}
            </p>
            <p className="text-color-heading font-medium">
              Customer Mobile : {customer360?.phone_no}
            </p>
            <p className="text-color-heading font-medium">
              Customer Gender : {customer360?.gender}
            </p>
          </div>
        </Box>
      ),
    },
    {
      id: "ticketing_history",
      title: "Ticketing History",
      icon: (
        <img src={TicketIcon} alt="ticket icon" height="40px" width="40px" />
      ),
      actionIcon: <SearchOutlinedIcon />,
      body: (
        <Box
          width={"100%"}
          sx={{
            background: "white",
            padding: 1,
            overflowY: "auto",
            // height: "40vh",
          }}
        >
          <div className="">
            {ticketHistory?.tickets?.map((ticket, key) => (
              <div
                className="mb-2 rounded-lg p-2"
                style={{ background: "#f5f6fb" }}
              >
                <div className="flex flex-row text-xs justify-between">
                  <p className="">
                    <span className="text-sky-600 font-semibold">#238943</span>{" "}
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
        </Box>
      ),
    },
    {
      id: "customer_convo_history",
      title: "Customer Conversion History",
      icon: (
        <img
          src={CustHistoryIcon}
          alt="history icon"
          height="40px"
          width="35px"
        />
      ),
      actionIcon: <MoreVertIcon onClick={() => console.log("Clicked")} />,
      body: (
        <Box width={"100%"} sx={{ background: "#f5f6fb", padding: 1 }}>
          <div className="w-fit text-xs  ">
            <p className="font-normal rounded-full truncate p-1 bg-yellow-100 text-amber-600">
              {custConvHistory?.time}
            </p>
          </div>

          <p className="font-bold text-xs my-2">
            Category:{" "}
            <span className="font-normal ">{custConvHistory?.category}</span>
          </p>
          <p className="font-bold text-xs my-2">
            Agent:{" "}
            <span className=" underline text-sky-600">
              {custConvHistory?.agent_name}
            </span>
          </p>
        </Box>
      ),
    },
  ];
};
