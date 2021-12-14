import React from 'react';
import className from 'classnames';
import 'components/InterviewerListItem.scss';
import PropTypes from 'prop-types';


const InterviewerListItem = ({ name, avatar, selected, setInterviewer }) => {
  const styleClass = className('interviewers__item', {
    'interviewers__item--selected': selected,
  });
  return (
    <li className={styleClass} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}

export default InterviewerListItem;