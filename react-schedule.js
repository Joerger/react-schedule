var React = require("react");
var ReactDOM = require("react-dom");

function convertTime (time) {
  if (typeof time === "number") {
    var minute = time % 100;
    var hour = ((time / 100 | 0) + 11) % 12 + 1;
    var suffix =  time < 1200 ? "AM" : "PM";
    return hour + ":" + (minute < 10 ? "0" : "" ) + minute + " " + suffix;
  } else if (typeof time === "string") {
    // Assuming Standard Time in HH:MM A/PM format
    var values = time.split(/[ :]/);
    var hour = values[0] % 12 + (values[2] == "PM"? 12 : 0);
    return hour * 100 + +values[1];
  }
};

function createTimes(start, end) {
  start = typeof start === "string" ? convertTime(start) : start;
  end = typeof end === "string" ? convertTime(end) : end;
  var result = [];
  for (var i = start; i <= end; i+= 100) {
    result.push((i / 100 | 0) * 100);
  }
  return result;
}

var color = {
  // Colors picked from palette
  red: "#E3BC9B",
  blue: "#B3A7C1",
  green: "#BFCBA3",
  white: "#FFFFFF",
  solid: "#425872",
  primary: "#C1D7F1",
  light: "#E7F7FE",
  timePrimary: "#425872",
  timeLight: "#425872"
}

//TODO: Componentize Sizes and Locations.


//Editable Data!
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var times = createTimes("8:00 AM","5:00 PM");
var entryBlocks = [
  {
    day: "Mon",
    start: "9:00 AM",
    end: "1:00 PM",
    color: color.green
  },
  {
    day: "Fri",
    start: "11:00 AM",
    end: "1:45 PM",
    color: color.blue
  },
];


function Schedule (props) {
  return (
    <div className="schedule" style={{border:"solid 1px white"}}>
      <HeadRow days={days} />
      {times.map(time => (<TimeRow time={time} days={days} key={time} />))}
      {entryBlocks.map(entryBlock => (<EntryBlock days={days} times={times} entryBlock={entryBlock} key={entryBlock.day + entryBlock.start + entryBlock.end + entryBlock.color} />))}
    </div>
  );
};

function HeadRow (props) {
  var dayCells = props.days.map(day => (<HeadCell text={day} key={day} />));
  return (
    <div className="schedule-row">
      <HeadCell text="Time"/>
      {dayCells}
    </div>
  );
};

function HeadCell (props) {
  return (
    <div className="schedule-head">
      {props.text}
    </div>
  );
}

function TimeRow (props) {
  var cells = props.days.map(day => (<Cell key={day + " " + props.time} />));
  return (
    <div className="schedule-row">
      <TimeCell time={props.time} />
      {cells}
    </div>
  );
}

function TimeCell (props) {
  return (
    <div className="schedule-time">
      <div>{convertTime(props.time)}</div>
    </div>
  );
}

function Cell (props) {
  return (
    <div className="schedule-cell"></div>
  );
}

function EntryBlock (props) {
  var xStart = 55;
  var yStart = 37;
  var step = 3;
  var xShift = 72;
  var yShift = 36;
  var getMinutesOffset = function (minutes, end) {
    var rawSize = Math.min(Math.ceil(minutes/5),12);
    return rawSize * step - (rawSize === 0 && end ?  1 : 0);
  }
  var entryBlockX = props.days.indexOf(props.entryBlock.day) * xShift + xStart;
  var entryBlockY = props.times.indexOf((convertTime(props.entryBlock.start) / 100 | 0) * 100) * yShift + yStart + getMinutesOffset(convertTime(props.entryBlock.start) % 100, false);
  var height = (props.times.indexOf((convertTime(props.entryBlock.end) / 100 | 0) * 100) * yShift + getMinutesOffset(convertTime(props.entryBlock.end) % 100, true)) - entryBlockY;
  var location = {
      left: entryBlockX + "px",
      top: entryBlockY + "px",
      height: height + "px",
      "backgroundColor": props.entryBlock.color
  };
  return (<div className="entry-block" style={location}></div>);
}

// Rendering to DOM
ReactDOM.render(
  <Schedule />,
  document.getElementById('container')
);