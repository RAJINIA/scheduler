import React, { Fragment } from 'react'
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';


const Appointment = (props) => {
  console.log(props);
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show /> : <Empty />}
    </article>
  );
}

export default Appointment;