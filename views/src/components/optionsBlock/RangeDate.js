// import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux'
// // import 'ArchiveOptions.scss'
// import DayPicker, { DateUtils } from 'react-day-picker';
// import Helmet from "react-helmet";
// import 'react-day-picker/lib/style.css';

// const ArchiveOptions = () => {
//     const [from, setFrom] = useState(undefined);
//     const [to, setTo] = useState(undefined);
//     const [numberOfMonths, setNumberOfMonths] = useState(2);
//     const [modifiers, setModifiers] = useState({});
//     useEffect(() => {
//         // setModifiers({ start: from, end: to })
//         setFrom(modifiers.from);
//         setTo(modifiers.to)
//     }, [modifiers])

//     const handleDayClick = (day) => {
//         // if(from === undefined) {
//         //     setFrom(day)
//         // } else {
//         //     setTo(day)
//         // }
//         const range = DateUtils.addDayToRange(day, modifiers);
//         console.log(from, to)
//         setModifiers(range);
//       }
    
//     return (
//         <div className='rangeDate'>
//             <DayPicker
//                 className="Selectable"
//                 numberOfMonths={numberOfMonths}
//                 selectedDays={[from, { from, to }]}
//                 modifiers={modifiers}
//                 onDayClick={handleDayClick.bind(this)}
//             />
//             <Helmet>
//           <style>{`
//   .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
//     background-color: #f0f8ff !important;
//     color: #4a90e2;
//   }
//   .Selectable .DayPicker-Day {
//     border-radius: 0 !important;
//   }
//   .Selectable .DayPicker-Day--start {
//     border-top-left-radius: 50% !important;
//     border-bottom-left-radius: 50% !important;
//   }
//   .Selectable .DayPicker-Day--end {
//     border-top-right-radius: 50% !important;
//     border-bottom-right-radius: 50% !important;
//   }
// `}</style>
//         </Helmet>
//         </div>
//     )
// }

// export default connect(null, null)(ArchiveOptions)




import React from "react";
import Helmet from "react-helmet";
import DayPicker, { DateUtils } from "react-day-picker";
import './ArchiveOptions.scss';
import "react-day-picker/lib/style.css";
import {setIntervalObj} from '../../redux/actions/checkBoxParam';
import { connect } from "react-redux";

class RangeDate extends React.Component {
  static defaultProps = {
    numberOfMonths: 2
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    let obj = new Array;
    obj.start = new Date(range.from).getTime();
    obj.finished = new Date(range.to).getTime()
    this.props.setIntervalObj(obj)
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="RangeExample">
        {/* <p>
          {!from && !to && "Please select the first day."}
          {from && !to && "Please select the last day."}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p> */}
        {/* <p>
        {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p> */}
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        {from && to && (
            <button className="reset" onClick={this.handleResetClick}>
            Reset
          </button>
        )}
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #2E0318 !important;
    color: red;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    background-color: #520300 !important;
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    background-color: #520300 !important;
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .DayPicker-Months {
      // width: 350px
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setIntervalObj
}

export default connect(null, mapDispatchToProps)(RangeDate)