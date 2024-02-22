import { lazy } from "react";
import { Conversation } from "../Config/Store/Slices/reducers/agentconsole_reducers/agentTranscript_reducers";
import moment from "moment";

const LazyLoadComponent = (path: string) => {
  return lazy(() => import(path));
};

export default LazyLoadComponent;

export const setLocalStorage = (name: string, value: any) =>
  localStorage.setItem(name, JSON.stringify(value));

export const getLocalStorage = (name: string) => localStorage.getItem(name);

export const deleteLocalStorage = (name: string) =>
  localStorage.removeItem(name);

export function capitalizeFirstLetter(string: string) {
  return string.replace(/^./, string[0].toUpperCase());
}

export function generateRandomColor() {
  const colors = ["#eab676", "#76b5c5", "#eca157"]; // Array of three colors
  const randomIndex = Math.floor(Math.random() * colors.length); // Generate a random index
  return colors[randomIndex];
}

export function getCurrentDate() {
  const currentDate = new Date();

  // Extract year, month, and day components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Construct the date string in the format "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatDate(dateString: string) {
  const currentDate = new Date(dateString);

  // Extract year, month, and day components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Construct the date string in the format "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function parseActualResponse(
  conversations: Conversation[]
): Conversation[] {
  console.log("conversations", conversations);
  return conversations.map((conversation) => {
    if (conversation.actual_response) {
      const jsonString = conversation.actual_response.replace(/'/g, '"');

      conversation.actual_response = JSON.parse(conversation.actual_response);
    }
    return conversation;
  });
}

export function convertToJSON(actual_response: any) {
  try {
    return JSON.parse(actual_response);
  } catch (error) {
    // console.error("Error parsing JSON:", error);
    return null;
  }
}

export function convertTimestampToTime(timestamp: string | undefined) {
  if (!timestamp) return "";

  const date = moment(timestamp, "ddd, DD MMM YYYY HH:mm:ss").format("h:mm");

  return date;
}

export function calculateTotalTime(startTime: any, endTime: any) {
  if (!startTime || !endTime) return;
  const format = "h:mm:ss";
  const datestartTime = moment(startTime, "ddd, DD MMM YYYY HH:mm:ss");
  const dateendTime = moment(endTime, "ddd, DD MMM YYYY HH:mm:ss");

  const startMoment = moment(startTime, format);
  const endMoment = moment(endTime, format);

  const duration = moment.duration(dateendTime.diff(datestartTime));
  // console.log("startMoment", datestartTime);
  // console.log("endMoment", dateendTime, duration);

  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.asMinutes()) % 60;
  const seconds = Math.floor(duration.asSeconds()) % 60;
  if (hours == 0 && minutes == 0 && seconds == 0) return "-";
  else if (hours == 0 && minutes == 0)
    return seconds == 0 ? "00" : seconds.toString().padStart(2, "0") + " sec";
  else {
    console.log("hours, minutes", hours, minutes);

    return `${hours == 0 ? "00" : hours.toString().padStart(2, "0")}:${
      minutes == 0 ? "00" : minutes.toString().padStart(2, "0")
    } min`;
  }
}

export function getCurrentTimeAsGMTString() {
  return moment.utc().local().format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const now = new Date();
  const day = days[now.getUTCDay()];
  const date = ("0" + now.getUTCDate()).slice(-2);
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();
  const hours = ("0" + now.getUTCHours()).slice(-2);
  const minutes = ("0" + now.getUTCMinutes()).slice(-2);
  const seconds = ("0" + now.getUTCSeconds()).slice(-2);

  return `${day}, ${date} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}
