import React, { useEffect, useState } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index";
import Show from "components/Appointment/Show";
import axios from "axios"
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors"


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Application(props) {
  
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(
      () => {
        console.log("somestring");
        setState({...state,
 appointments});
 })
 
}
 
function editInterview(id, interview) {
  console.log("Hello");
  
}

function cancelInterview(id, interview) {

    return axios.delete(`/api/appointments/${id}`, interview)
    .then(
      () => {setState({...state});
      })
    
  }
 

  const [state, setState] = useState(
    {
    day: "Monday",
    days: [],
    appointments: {
      "1": {   
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });
   useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, 
        appointments: all[1].data, interviewers: all[2].data }));
      
      
      })  
    }, []);
 

  
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({...prev, days}));
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList 
  days={state.days} 
  day={state.day} 
  setDay={setDay} 
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
   </section>
   <section className="schedule">
       {
         getAppointmentsForDay(state, state.day).map(appointment => {
           const interview = getInterview(state, appointment.interview);
         console.log(interview);
           //  const interviewers = getInterviewersForDay(state, state.day)
           return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              //interviewers={interviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              editInterview={editInterview}
            />
           )}
        
         )}
      </section>
    </main>
  );
  
}
