import React from 'react';

import Schedule from '../js/react-schedule/Schedule';
import courseMap from 'json-loader!../data/sample-courses.json'; //eslint-disable-line
import parseDataToCourse from '../js/parseDataToCourse';

function Home() {
  const courses = [];
  for (let i = 0; i < Object.keys(courseMap).length; i++) {
    courses.push(parseDataToCourse(courseMap[Object.keys(courseMap)[i]]));
  }
  return (
    <div className="container">
      <br />
      <div className="row center">
        <Schedule courses={courses} />
      </div>
      <br />
    </div>
  );
}

export default Home;
