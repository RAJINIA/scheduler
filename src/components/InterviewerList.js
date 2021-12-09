import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';


const InterviewerList = ({interviewers, value, setInterviewer}) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewers &&
          interviewers.map((interviewer) => (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === value}
              setInterviewer={(e) => setInterviewer(interviewer.id)}
            />
          ))}
      </ul>
    </section>

  )
}

export default InterviewerList;


