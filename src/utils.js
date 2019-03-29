import React from "react";

//for show notifications
import notificationsOn from "./assets/notifica_orange-20.svg";
import notificationsOff from "./assets/notifica_grey-20.svg";
import moment from "moment";

export function search(str, arr) {
  if (!str) {
    return [];
  }
  return arr.filter(item =>
    item.toLocaleLowerCase().startsWith(str.toLocaleLowerCase())
  );
}

const showNotifications = (num, silent) => {
  if (num === 0) return;
  else {
    if (!silent) {
      return (
        <div className="Card-notification">
          <img alt="notifications" src={notificationsOn} />
          <span className="Card-numUnread">{num}</span>
        </div>
      );
    } else {
      return (
        <div className="Card-notification">
          <img alt="notifications" src={notificationsOff} />
          <span className="Card-numUnread">{num}</span>
        </div>
      );
    }
  }
};
export { showNotifications };

const getCapitals = string => {
  let name = string.split(" "); //.map s => s.charAt(0).toUpperCase()
  return name[0][0] + name[name.length - 1][0];
};
export { getCapitals };

const detectDate = date => {
  date = moment.unix(date);
  let diff = moment().diff(date, "days");
  return diff;
};
export { detectDate };

const getUnread = num => {
  if (num === 0) return "Card Card-inactive";
  else return "Card Card-active";
};
export { getUnread };

const getActive = bool => {
  if (bool) return "Card-selected";
  else return null;
};
export { getActive };

const dotsOnClick = (evt, funct) => {
  evt.preventDefault();
  evt.stopPropagation();
  //this.setState{favouritesActive:true}
  funct();
};
export { dotsOnClick };

const setOption = (evt, option, funct) => {
  evt.preventDefault();
  evt.stopPropagation();
  funct(option);
};
export { setOption };
// setState({
//   option: !state.highlighted
