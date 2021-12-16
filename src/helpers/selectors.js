const getAppointmentsForDay = (state, day) => {
  const result = [];
  for (const elem of state.days) {
    if (elem.name === day) {
      for (const appt of elem.appointments) {
        if (state.appointments[appt]) {
          result.push(state.appointments[appt]);
        }
      }
    }
  }
  return result;

  // const {days, appointments} = state;
  // const filteredDay = days.find(item => day === item.name);
  // if (days.length < 1 || filteredDay === undefined) {
  //   return [];
  // } 
  // console.log("Filtered Day", filteredDay);
  // const daysAppointment = filteredDay.appointments.map(id => appointments[id])
  // console.log("Days Appointment", daysAppointment);
  // return daysAppointment;
};

const getInterview = (state, interview) => {
  const result = {};
  if (interview) {
    result["student"] = interview.student;
    result["interviewer"] = state.interviewers[interview.interviewer]
  } else {
    return null;
  }
  return result;
};

const getInterviewersForDay = (state, day) => {
  const result = [];
  for (const elem of state.days) {
    if (elem.name === day) {
      for (const int of elem.interviewers) {
        if (state.interviewers[int]) {
          result.push(state.interviewers[int]);
        }
      }
    }
  }
  return result;
};

export {getAppointmentsForDay, getInterview, getInterviewersForDay};
