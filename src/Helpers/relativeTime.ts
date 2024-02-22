export default function timeAgo(timestamp: string): string {
  const currentDate: Date = new Date();
  const objectDate: Date = new Date(timestamp);

  // Check if the timestamp format is "Tue, 30 Jan 2024 00:00:00 GMT"
  if (isNaN(objectDate.getTime()) && timestamp?.includes(',')) {
    // Parse the timestamp with Date.parse
    const parsedDate: Date = new Date(Date.parse(timestamp));

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      objectDate.setTime(parsedDate.getTime());
    }
  }

  const timeDifference: number = currentDate.getTime() - objectDate.getTime();

  // Convert time difference to seconds
  const seconds: number = Math.floor(timeDifference / 1000);

  // Define time intervals
  const intervals: { label: string; seconds: number }[] = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  // Calculate the relative time
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return count === 1 ? `${count} ${interval.label} ago` : `${count} ${interval.label}s ago`;
    }
  }

  return 'Just now';
}
