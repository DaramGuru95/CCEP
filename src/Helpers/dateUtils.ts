export const convertDate = (userData: any) => {
  // Parse the date string into a Date object
  const dateString: string = userData;
  const date: Date = new Date(dateString);

  // Format the date into "DD/mm/yyyy" format
  const formattedDate: string = `${("0" + date.getDate()).slice(-2)}/${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}/${date.getFullYear()}`;

  // Calculate the time difference
  const currentTime: Date = new Date();
  const timeDifference: number = Math.abs(
    currentTime.getTime() - date.getTime()
  );
  const hoursAgo: number = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesAgo: number = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsAgo: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Output the results with conditions
  if (hoursAgo > 0) {
    if (hoursAgo > 24) {
      return `${formattedDate}`;
    } else {
      return `${formattedDate} - ${hoursAgo} hours ago`;
    }
  } else if (minutesAgo > 0) {
    if (minutesAgo > 60) {
      return `${formattedDate}`;
    } else {
      return `${formattedDate} - ${minutesAgo} minutes ago`;
    }
  } else {
    if (secondsAgo > 60) {
      return `${formattedDate}`;
    } else {
      return `${formattedDate} - ${secondsAgo} seconds ago`;
    }
  }
};

export const dateFormat = (date: any) => {
  const date_object = new Date(date);
  const formatted_date = date_object.toISOString().split("T")[0];
  return formatted_date;
};
