export const dateConvert = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const monthNames = [
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Function to get the suffix for the day
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = `${day}${getDaySuffix(day)} ${month} ${year}`;
  return formattedDate;
};
