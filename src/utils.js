import React from "react";

//for show notifications
import notificationsOn from "./assets/notifica_orange-20.svg";
import notificationsOff from "./assets/notifica_grey-20.svg";
import moment from "moment";
import logo from "./assets/logo_blackbird.svg";
import "./spinner.css";

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
      <span className="Card-numUnread">{num > 99 ? "99+" : num}</span>
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

export const showSpinner = () => {
  return (
    <div className="loadingContainer">
      <div className="loadingSpinner">
        <img className="logo" src={logo} alt="blackbird logo" />
        <div className="spinner">
          <div className="cube1" />
          <div className="cube2" />
        </div>
      </div>
    </div>
  );
};

export const showDisplayName = (name, str) => {
  if (str !== "") {
    var reg = new RegExp(str, "gi");
    return name.replace(reg, str => "<strong>" + str + "</strong>");
  } else return name;
};

export const calcCardList = (favActive, searchStr, unfilteredList) => {
  let filtered = [...unfilteredList].filter(el =>
    el.name.toLowerCase().includes(searchStr)
  );
  if (favActive) {
    return filtered.filter(el => el.favourite);
  } else return filtered;
};

export const filterMessages = (messages, str) => {
  let filtered = messages.filter(el => el.text.includes(str));
  return filtered;
};

export function newCollocutor(id, name, status) {
  return {
    id: id,
    name: name,
    status: status,
    favourite: false,
    silenced: false,
    listed: true
  };
}
export const randomColor = str => {
  var colours = [
    "#01ABCE",
    "#71BF45",
    "#01A55D",
    "#FFCA08",
    "#F7941D",
    "#F25822",
    "#ED008C",
    "#D41E4E",
    "#AC54A0",
    "#5A2E90"
  ];
  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colours.length) + colours.length) % colours.length;
  return colours[hash];
};

export const collocutorMatches = (collocutors, id) => {
  return collocutors.find(el => el.id === id);
};
