import React, { PropTypes } from 'react';

const propTypes = {
  courses: PropTypes.object.isRequired,
};

function Schedule(props) {
  return (
    <div props={props} /> // Suppressing errors
  );
}

Schedule.propTypes = propTypes;

export default Schedule;
