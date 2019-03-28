import React from "react";

//for show notifications
import notificationsOn from "./assets/notifica_orange-20.svg";
import notificationsOff from "./assets/notifica_grey-20.svg";

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
