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

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const deleteAppointment = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };


return (
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
    {mode === SHOW && props.interview && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onEdit={() => transition(EDIT)}
        // onDelete={deleteAppointment}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === EDIT && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    )}
    {mode === SAVING && <Status message="SAVING ..." />}
    {mode === DELETING && <Status message='DELETING ...' />}
    {mode === CONFIRM && (
      <Confirm
        message='Delete the appointment?'
        onCancel={back}
        onConfirm={deleteAppointment}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error message='Could not save appointment.' onClose={back} />
    )}
    {mode === ERROR_DELETE && (
      <Error message='Could not delete appointment.' onClose={back} />
    )}
  </article>
);
}

export default Appointment;