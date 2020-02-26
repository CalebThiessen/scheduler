import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
    
    const theDays = props.days.map(days => {
        
        return (
        <DayListItem
            key={days.id}
            name={days.name}
            spots={days.spots}
            selected={days.name === props.day}
            setDay={props.setDay}
            />

        )
    });
  
    return <ul>{theDays}</ul>
}