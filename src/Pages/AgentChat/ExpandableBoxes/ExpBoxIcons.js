// import * as React from 'react';
// import SvgIcon from '@mui/material/SvgIcon';


// export function RightIcon() {
//     return (
//       <SvgIcon>
//       <svg width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M0.909973 16.9201L7.42997 10.4001C8.19997 9.63008 8.19997 8.37008 7.42997 7.60008L0.909973 1.08008" stroke="#111827" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>


//       </SvgIcon>
//     );
//   }


// import React from "react";
// import {
//   Accordion,
//   AccordionDetails,
//   Box,
//   IconButton,
//   Paper,
//   Typography,
// } from "@mui/material";
// import ExpandableCustomWindow from "../../../Components/ui/ui/agentCoPilot/ExpandableCustomWindow";
// import AdharMasking from "../../../assets/icons/adhar_masking.svg";
// import TicketIcon from "../../../assets/icons/ticketing.svg";
// import FilterIcon from "../../../assets/icons/filter.svg";
// import CustHistoryIcon from "../../../assets/icons/cust_history.svg";
// import KababVerticalIcon from "../../../assets/icons/kabab_vertical.svg";
// // import SearchIcon from "../../../assets/icons/Search.svg";
// import SearchIcon from "../../../assets/images/SearchIcon.png";
// import FilterAlt from "../../../assets/icons/fliteralt.svg";
// import { Customer360Modal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/customer360_reducers";
// import { CustConvHistoryModal } from "../../../Config/Store/Slices/reducers/agentconsole_reducers/custConvHistory_reducers";
// import { formatDate } from "../../../Helpers/commonHelper";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
// import { RightIcon } from "./ExpBoxIcons";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
// import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
// import HistoryIcon from '@mui/icons-material/History';

// import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
// import MuiAccordionSummary, {
//   AccordionSummaryProps,
// } from "@mui/material/AccordionSummary";
// import { styled } from "@mui/material/styles";

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary {...props} />
// ))(({ theme }) => ({

//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(0deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const ExpandableBoxes = ({
//   customer360,
//   custConvHistory,
//   ticketHistory,
// }: {
//   customer360: Customer360Modal;
//   custConvHistory: CustConvHistoryModal;
//   ticketHistory: any;
// }) => {
//   const [expanded, setExpanded] = React.useState<string | boolean>(false);

//   const handleChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       if (isExpanded) {
//         setExpanded(isExpanded ? panel : false);
//       }
//     };

//   const accordianObj = [
//     {
//       id: "customer_360",
//       title: "Customer 360",
//       icon: <img src={AdharMasking} alt="adhaar" height="40px" width="40px" />,
//       actionIcon: <MoreVertIcon onClick={() => console.log("Clicked")} />,
//       body: (
//         <Box
//           width={"100%"}
//           sx={{
//             background: "#f5f6fb",
//             padding: 1,
//             borderRadius: 2,
//             overflowY: "auto",
//           }}
//         >
//           <div className="w-full text-xs  ">
//             <p className="font-semibold text-color-heading">Basic Details</p>
//             <p className="mt-1 text-color-heading font-medium">
//               Customer Name :
//               {" " + customer360?.first_name + " " + customer360?.last_name}
//             </p>
//             <p className="text-color-heading font-medium">
//               Account Number : {"Static"}
//             </p>
//             <p className="text-color-heading font-medium">
//               Date of Birth : {customer360?.dob}
//             </p>
//             <p className="text-color-heading font-medium">
//               Mother Maiden Name : {customer360?.mother_name}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Education : {customer360?.education}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Email : {customer360?.email}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Marital Status : {customer360?.marital_status}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Occupation : {customer360?.occupation}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Mobile : {customer360?.phone_no}
//             </p>
//             <p className="text-color-heading font-medium">
//               Customer Gender : {customer360?.gender}
//             </p>
//           </div>
//         </Box>
//       ),
//     },
//     {
//       id: "ticketing_history",
//       title: "Ticketing History",
//       icon: <img src={TicketIcon} alt="ticket icon"   height="40px" width="40px"/>,
//       actionIcon: <SearchOutlinedIcon />,
//       body:<Box width={"100%"} sx={{ background: "white", padding: 1,overflowY:'auto',height:'40vh' }}>
//       <div className="">
//         {ticketHistory?.tickets?.map((ticket: any, key: any) => (
//           <div
//             className="mb-2 rounded-lg p-2"
//             style={{ background: "#f5f6fb" }}
//           >
//             <div className="flex flex-row text-xs justify-between">
//               <p className="">
//                 <span className="text-sky-600 font-semibold">#238943</span>{" "}
//                 <span className="bg-yellow-100 text-amber-600 px-1 mx-1 rounded-full">
//                   {formatDate(ticket["created_on"])}
//                 </span>
//               </p>
//               <p className="text-black capitalize font-semibold px-1 bg-gray-200 rounded-full">
//                 {ticket["status"]}
//               </p>
//             </div>
//             <p className="font-bold text-xs my-2">
//               Category:{" "}
//               <span className="font-normal ">{ticket["category"]}</span>
//             </p>
//             <p className="font-semibold w-fit text-sky-600 bg-white rounded full text-xs px-2">
//               Close date
//               <span className="font-normal"> - 22 Nov 23</span>{" "}
//               <span className="font-normal ">| 11:20 am</span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </Box>
//     },
//     {
//       id: "customer_convo_history",
//       title: "Customer Conversion History",
//       icon: <img src={CustHistoryIcon} alt="history icon" height='40px'width='35px' />,
//       actionIcon: <MoreVertIcon onClick={() => console.log("Clicked")} />,
//       body: <Box width={"100%"} sx={{ background: "#f5f6fb", padding: 1 }}>
//       <div className="w-fit text-xs  ">
//         <p className="font-normal rounded-full truncate p-1 bg-yellow-100 text-amber-600">
//           {custConvHistory?.time}
//         </p>
//       </div>

//       <p className="font-bold text-xs my-2">
//         Category:{" "}
//         <span className="font-normal ">{custConvHistory?.category}</span>
//       </p>
//       <p className="font-bold text-xs my-2">
//         Agent:{" "}
//         <span className=" underline text-sky-600">
//           {custConvHistory?.agent_name}
//         </span>
//       </p>
//     </Box>
//     },
//   ];

//   return (
//     <Box>
//       {accordianObj?.map((item) => (
//         <Accordion
//         sx={{'&:not(:last-child)': {
//           marginBottom: 1,
//         },}}
//           key={item.id}
//           expanded={expanded === item.id}
//           onChange={handleChange(item.id)}
//         >
//           <AccordionSummary
//             component={ Paper}
//             expandIcon={
//               expanded === item.id ? (
//                 item.actionIcon
//               ) : (
//                 <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
//               )
//             }
//             aria-controls={item.id}
//             id={item.id}
//           >
//             <Box
//               display={"flex"}
//               alignItems={"center"}
//               width={"100%"}
//               justifyContent={"flex-start"}
//               gap={1}
//             >
//               <Box>{item.icon}</Box>
//               <Typography sx={{ flexShrink: 0, fontWeight: 600 }}>
//                 {item.title}
//               </Typography>
//             </Box>
//           </AccordionSummary>
//           <AccordionDetails >
//             <Box>
//               {item.body}
//               <IconButton
//                 size="small"
//                 sx={{
//                   transform: "rotate(45deg)",
//                   position: "absolute",
//                   bottom: 10,
//                   right: 15,
//                 }}
//                 onClick={() => setExpanded(false)}
//               >
//                 {expanded ? (
//                   <UnfoldLessIcon sx={{ width: 18, height: 18 }} />
//                 ) : (
//                   <UnfoldMoreIcon sx={{ width: 18, height: 18 }} />
//                 )}
//               </IconButton>
//             </Box>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );
// };

// export default ExpandableBoxes;


