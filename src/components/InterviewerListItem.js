import React from "react";
import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props) {
    const { avatar, name, selected, setInterviewer } = props;
  
    return (
      <li
        className={`interviewers__item ${
          selected ? 'interviewers__item--selected' : ''
        }`}
        onClick={setInterviewer}
      >
        <img className="interviewers__item-image" src={avatar} alt={name} />
        {selected ? name : ''}
      </li>
    );
  }
// export default function InterviewerListItem(props) {
//     const { avatar, name, selected, setInterviewer } = props;
  
//     return (
//       <li
//         className={`interviewers__item ${
//           selected ? 'interviewers__item--selected' : ''
//         }`}
//         onClick={setInterviewer}
//       >
//         <img className="interviewers__item-image" src={avatar} alt={name} />
//         {selected ? name : ''}
//       </li>
//     );
//   }