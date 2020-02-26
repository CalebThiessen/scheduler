export const getAppointmentsForDay = (state, day) => {
  const appointmentsId = state.days
    .filter(p => p.name === day)
    .map(p => p.appointments)
    .reduce((acc, val) => acc.concat(val), []);

  const appointment = [];
  appointmentsId.forEach(e => {
    appointment.push(state.appointments[e]);
  });

  return appointment;
};

export const getInterviewersForDay = (state, day) => {
  const interviewersId = state.days
    .filter(p => p.name === day)
    .map(p => p.interviewers)
    .reduce((acc, val) => acc.concat(val), []);

  const interview = [];
  interviewersId.forEach(e => {
    interview.push(state.interviewers[e]);
  });

  return interview;
};

export const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const student = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    const interviewObj = { student, interviewer };
    return interviewObj;
  }
};
