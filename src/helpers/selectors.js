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
}


export default getAppointmentsForDay;