import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors";
import { getInterview, getInterviewersForDay } from "helpers/selectors";


const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const setDay = day => setState({ ...state, day });
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);


  useEffect(() => {
    const baseURL = "http://localhost:8001"
    const daysURL= axios.get(`${baseURL}/api/days`)
    const appointmentURL = axios.get(`${baseURL}/api/appointments`)
    const interviewersURL = axios.get(`${baseURL}/api/interviewers`)
    Promise.all([daysURL, appointmentURL, interviewersURL])
    .then(resArr => {
      setState(prev => ({
        ...prev, 
        days:resArr[0].data, 
        appointments:resArr[1].data, 
        interviewers:resArr[2].data
      }));
    });
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList 
            days={state.days} 
            value={state.day} 
            onChange={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment 
              key={appointment.id} 
              id={appointment.id} 
              time={appointment.time} 
              interview={interview} 
              interviewers={interviewers}
            />
          )
        }
        )}
          <Appointment key='last' time='5pm' />

      </section>
    </main>
  );
}


export default Application;

