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


const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
  }, [mode, transition, props.interview]);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    props.bookInterview(props.id, newInterview);
    transition(SHOW);
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
        />
      )}
      { mode === SAVING && <Status message="SAVING ..." /> }

    </article>
  );
}

export default Appointment;

