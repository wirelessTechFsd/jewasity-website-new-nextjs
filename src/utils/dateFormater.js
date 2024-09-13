// import { isWithinInterval, subMinutes } from "date-fns";
// import moment from "moment";

// export const renderDate = (date) => {
//   const dateObj = new Date(date);
//   if (isNaN(dateObj.getTime())) {
//     return "Invalid Date";
//   }

//   const now = new Date();

//   const startInterval = subMinutes(now, 60);

//   if (
//     isWithinInterval(dateObj, {
//       start: startInterval,
//       end: now,
//     })
//   ) {
//     const minutesAgo = Math.floor((now - dateObj) / (1000 * 60));
//     return minutesAgo === 0 ? "Just Now" : `${minutesAgo} minutes ago`;
//   }

//   return moment.utc(dateObj).format("MMM DD YYYY | h:mm A");
// };

// import { isWithinInterval, subMinutes } from "date-fns";
// import moment from "moment-timezone";

// export const renderDate = (date) => {
//   const dateObj = new Date(date);
//   if (isNaN(dateObj.getTime())) {
//     return "Invalid Date";
//   }

//   const now = new Date();
//   const startInterval = subMinutes(now, 60);

//   if (
//     isWithinInterval(dateObj, {
//       start: startInterval,
//       end: now,
//     })
//   ) {
//     const minutesAgo = Math.floor((now - dateObj) / (1000 * 60));
//     return minutesAgo === 0 ? "Just Now" : `${minutesAgo} minutes ago`;
//   }

//   // Always format the date in New York time zone
//   return moment(dateObj)
//     .tz("America/New_York")
//     .format("MMM DD YYYY | h:mm A");
// };


import { isWithinInterval, subMinutes } from "date-fns";
import moment from "moment-timezone";

export const renderDate = (date) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  // Get the current time in New York time zone
  const now = moment.tz("America/New_York");
  const dateInNY = moment(dateObj).tz("America/New_York");

  // Calculate the start of the interval in New York time zone
  const startInterval = moment(now).subtract(60, 'minutes');

  // Check if the date is within the last 60 minutes
  if (
    dateInNY.isBetween(startInterval, now, undefined, '[]')
  ) {
    const minutesAgo = Math.floor(now.diff(dateInNY) / (1000 * 60));
    return minutesAgo === 0 ? "Just Now" : `${minutesAgo} minutes ago`;
  }

  // Format the date in New York time zone
  return dateInNY.format("MMM DD YYYY | h:mm A");
};
