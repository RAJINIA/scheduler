import React from "react";
import "components/DayListItem.scss";
import className from "classnames";


function DayListItem(props) {
  let dayClass = className("day-list__item ",{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  } );

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  }

  // return (
  //   <li onClick = {() => props.setDay(props.name)}>
  //     <h2 className="text--regular">{props.name}</h2>
  //     <h3 className="text--light">{props.spots} spots remaining</h3>
  //   </li>
  // );

  return (
    <li 
      className={dayClass} 
      onClick= {() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
 );
}

export default DayListItem;