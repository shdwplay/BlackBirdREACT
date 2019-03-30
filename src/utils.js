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

export const showNotifications = (num, silent) => {
  if (num === 0) return;
  return (
    <div className="Card-notifications">
      <img
        alt="notifications"
        src={silent ? notificationsOff : notificationsOn}
      />
      <span className="Card-numUnread">{num}</span>
    </div>
  );
};

export const getCapitals = string => {
  let name = string.split(" "); //.map s => s.charAt(0).toUpperCase()
  return name[0][0] + name[name.length - 1][0];
};

export const detectDate = date => {
  date = moment.unix(date);
  let diff = moment().diff(date, "days");
  return diff;
};

export const dotsOnClick = (evt, funct) => {
  evt.preventDefault();
  evt.stopPropagation();
  //this.setState{favouritesActive:true}
  funct();
};

export const setOption = (evt, option, funct) => {
  evt.preventDefault();
  evt.stopPropagation();
  funct(option);
};
