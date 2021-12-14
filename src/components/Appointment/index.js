import React, { useEffect, Fragment } from 'react'
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';


const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    console.log("****", props.interview);
    if (props.interview === null) {
      transition(EMPTY);
    } else if (props.interview) {
      transition(SHOW);
    }
  }, [props.interview]);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    props.bookInterview(props.id, newInterview);
  };

  const deleteAppointment = () => {
    transition(DELETING);
    props.cancelInterview(props.id);
  };
  
  return(
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()}
          onSave={save} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          // onDelete={deleteAppointment}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      { mode === SAVING && <Status message="SAVING ..." /> }
      {mode === DELETING && <Status message='DELETING ...' />}
      {mode === CONFIRM && (
        <Confirm
          message='Delete the appointment?'
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}
    </article>
  );
}

export default Appointment;

