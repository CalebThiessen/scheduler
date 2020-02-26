import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h1 className="text--regular">{props.name}</h1>

      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}
const formatSpots = function(props) {
  if (props === 0) {
    return `no spots remaining`;
  } else if (props === 1) {
    return "1 spot remaining";
  }
  return `${props} spots remaining`;
};
