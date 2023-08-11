const CurrentDate = (props: number) => {
  const date = (date: number): string => {
    const dateObj: number = new Date(date * 1000).getTime() / 1000;
    const time: Date = new Date(date * 1000);
    const today: number = new Date().getTime() / 1000;
    const difference: number = today - dateObj;
    const futureDate: number = dateObj - today;

    if (difference < 60 && difference > -1) {
      if (difference === 0) {
        return "Right now";
      }
      return `${difference} seconds ago , ${time.toDateString()}`;
    } else if (difference < 3600 && difference > 59) {
      return `${Math.floor(
        difference / 60
      )} minutes ago , ${time.toDateString()}`;
    } else if (difference < 86400 && difference > 3599) {
      return `${Math.floor(
        difference / 3600
      )} hours ago , ${time.toDateString()}`;
    } else if (difference < 2620800 && difference > 86399) {
      if (difference / 86400 < 2) {
        return `Yesterday , ${time.toDateString()}`;
      }
      return `${Math.floor(
        difference / 86400
      )} days ago , ${time.toDateString()}`;
    } else if (difference < 31449600 && difference > 2620799) {
      return `${Math.floor(
        difference / 2620800
      )} months ago , ${time.toDateString()}`;
    } else if (difference > 31449599) {
      return `${Math.floor(
        difference / 31449600
      )} years ago , ${time.toDateString()}`;
    }

    if (futureDate / 86400 <= 2) {
      return `Tomorrow , ${time.toDateString()}`;
    }
    return `in ${Math.floor(
      futureDate / (60 * 60 * 24)
    )} day , ${time.toDateString()}`;
  };

  return date(props);
};

export default CurrentDate;
