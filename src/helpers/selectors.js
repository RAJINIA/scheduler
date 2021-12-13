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


export default getAppointmentsForDay;
export {getInterview};