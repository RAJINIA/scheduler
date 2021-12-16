import { useState, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {
    const baseURL = "http://localhost:8001"
    const daysURL = axios.get(`${baseURL}/api/days`)
    const appointmentURL = axios.get(`${baseURL}/api/appointments`)
    const interviewersURL = axios.get(`${baseURL}/api/interviewers`)
    Promise.all([daysURL, appointmentURL, interviewersURL])
      .then(resArr => {
        setState(prev => ({
          ...prev,
          days: resArr[0].data,
          appointments: resArr[1].data,
          interviewers: resArr[2].data
        }));
      });
  }, []);

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day];
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const dayOfWeek = findDay(state.day);

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      } 
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      } 
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        setState({ ...state, appointments, days });
      })

  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({ ...state, appointments, days });
      })

  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

export default useApplicationData;