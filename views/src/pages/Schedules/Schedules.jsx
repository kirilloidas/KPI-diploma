import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/navbar/Navbar';
import ControlSystem from './ControlSystem';
import Chart from 'chart.js'
import {
  actionTMinWater,
  actionTMaxWater,
  actionTMinOutside,
  actionTMaxOutside,
  actionTOutside} from '../../redux/actions/modeling'
import './Schedules.scss'

// export const Schedules = () => {
//     const [speed, setSpeed] = useState(100);
//     const [points, setPoints] = useState([]);
//     const [results, setResults] = useState(0);
//     const [in1, setIn1] = useState(0);
//     const [input_PID, setInput_PID] = useState(70)
//     const system = new ControlSystem(1)
//     const schedule = useRef(null)
//     const animationRef = useRef(null)

//     const [TMinWater, setTMinWater] = useState(70);
//     const [TMaxWater, setTMaxWater] = useState(95);
//     const [TMinOutside, setTMinOutside] = useState(-20);
//     const [TMaxOutside, setTMaxOutside] = useState(5);
//     const [TOutside, setTOutside] = useState(-15);
//     const [TWater, setTWater] = useState();
//     let chart

//     useEffect(() => {
//       const ctx = schedule.current.getContext("2d")

//     const colors = {
//       purple: {
//           default: "rgba(34, 146, 255, 1)",
//           half: "rgba(45, 82, 164, 0.75)",
//           quarter: "rgba(26, 52, 92, 0.5)",
//           zero: "rgba(10, 19, 34, 0.2)"
//       },
//       indigo: {
//           default: "rgba(80, 102, 120, 1)",
//           quarter: "rgba(80, 102, 120, 0.25)"
//       }
//     };

//     let gradient = ctx.createLinearGradient(0, 0, 0, 500);
//             gradient.addColorStop(0, colors.purple.half);
//             gradient.addColorStop(0.35, colors.purple.quarter);
//             gradient.addColorStop(1, colors.purple.zero);

//     const chartCfg = {
//         type: 'line',
//         data: {
//           datasets: [{
//               fill: true,
//               backgroundColor: gradient,
//               pointBackgroundColor: colors.purple.default,
//               borderColor: colors.purple.default,
//               data: points,
//               lineTension: 0.4,
//               borderWidth: 4,
//               pointRadius: 0
//           }]
//       },
//         options: {
//           responsive: true,
//           animation: {
//             duration: 100,
//             easing: 'linear'
//           },
//           legend: false,
//           scales: {
//             yAxes: [{
//               ticks: {
//                 max: 150,
//                 min: 0
//               }
//             }]
//           }
//         }
//       };
//       localStorage.setItem('input_PID', 50)
//       chart = new Chart(ctx, chartCfg)
//       run();
//     }, [])

//     function progress() {  
//         calculateZD()      
//         if (Math.round(system.y) == Math.round(parseFloat(in1))) {
//         } else if (system.y < system.x) {
//           setIn1(in1 - 1)
//         } else if (system.y > system.x) {
//             setIn1(in1 + 1)
//         }
    
    
//       //
//       system.x = parseFloat(in1);
//       console.log(input_PID)
//       system.zd = parseFloat(localStorage.getItem('input_PID'))
//       system.transfer();
//       //
//       if (points.length > 150) {
//         chart.data.labels.shift();
//         points.shift();
//       }
//       chart.data.labels.push(system.time);
//       points.push({
//         x: system.time,
//         y: system.y
//       });
//       chart.update();
      
//       setResults(system.y)
//       setTWater(system.y)
//     }

//     function run() {
//       progress();
//       setTimeout(function () {
//         run()
//       }, speed);
//     }

//     function scalling() {
//       const calc = (TMinWater - TMaxWater) / (TMaxOutside - TMinOutside);
//       return calc * TOutside + TMinWater
//     }

//     function calculateZD() {
//       if(TOutside >= TMaxOutside) {
//         localStorage.setItem('input_PID', TMinWater)
//       } else if(TOutside <= TMinOutside) {
//         localStorage.setItem('input_PID', TMaxWater)
//       } else {
//         localStorage.setItem('input_PID', scalling())
//       }
//     }

//     return (
//         <div className='schedules-main'>
//             <NavBar/>
//             <div className='schedules-main__options'>
//               <label className='input-label'>TMinWater
//                   <input type='text' value={TMinWater} onChange={e => setTMinWater(e.target.value)} />
//               </label>
//               <label className='input-label'>TMaxWater
//                   <input type='text' value={TMaxWater} onChange={e => setTMaxWater(e.target.value)} />
//               </label>
//               <label className='input-label'>TMinOutside
//                   <input type='text' value={TMinOutside} onChange={e => setTMinOutside(e.target.value)} />
//               </label>
//               <label className='input-label'>TMaxOutside
//                   <input type='text' value={TMaxOutside} onChange={e => setTMaxOutside(e.target.value)} />
//               </label>
//               <label className='input-label'>TOutside
//                   <input type='text' value={TOutside} onChange={e => setTOutside(e.target.value)} />
//               </label>
//               <label className='input-label'>TWater
//                   <input type='text' value={TWater} onChange={e => setTWater(e.target.value)}  readOnly/>
//               </label>
//             </div>
//             <div className='schedules-main__apply-block'>
//               <span className='apply-btn' onClick={() => calculateZD()}>Застосувати</span>
//             </div>
//             <canvas ref = {schedule} width='800' className='chart'/>
//             {/* <span>{{results}}</span> */}
//         </div>
//     )
// }


export const Schedules = (props) => {
  // const [speed, setSpeed] = useState(100);
  // const [points, setPoints] = useState([]);
  // const [results, setResults] = useState(0);
  // const [in1, setIn1] = useState(0);
  // const [input_PID, setInput_PID] = useState(70)
  // const system = new ControlSystem(1)
  const schedule = useRef(null)

  const [TMinWater, setTMinWater] = useState(70);
  const [TMaxWater, setTMaxWater] = useState(95);
  const [TMinOutside, setTMinOutside] = useState(-20);
  const [TMaxOutside, setTMaxOutside] = useState(5);
  const [TOutside, setTOutside] = useState(-15);
  let chart

  useEffect(() => {
    console.log(actionTMinWater)
    const ctx = schedule.current.getContext("2d")

  const colors = {
    purple: {
        default: "rgba(34, 146, 255, 1)",
        half: "rgba(45, 82, 164, 0.75)",
        quarter: "rgba(26, 52, 92, 0.5)",
        zero: "rgba(10, 19, 34, 0.2)"
    },
    indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.25)"
    }
  };

  let gradient = ctx.createLinearGradient(0, 0, 0, 500);
          gradient.addColorStop(0, colors.purple.half);
          gradient.addColorStop(0.35, colors.purple.quarter);
          gradient.addColorStop(1, colors.purple.zero);

  const chartCfg = {
      type: 'line',
      data: {
        labels: props.time,
        datasets: [{
            fill: true,
            backgroundColor: gradient,
            pointBackgroundColor: colors.purple.default,
            borderColor: colors.purple.default,
            data: props.points,
            lineTension: 0.4,
            borderWidth: 4,
            pointRadius: 0
        }]
    },
      options: {
        responsive: true,
        animation: {
          duration: 100,
          easing: 'linear'
        },
        legend: false,
        scales: {
          yAxes: [{
            ticks: {
              max: 150,
              min: 0
            }
          }]
        }
      }
    };
    // localStorage.setItem('input_PID', 50)
    chart = new Chart(ctx, chartCfg)
    run();
  }, [])

  // function progress() {  
  //     calculateZD()      
  //     if (Math.round(system.y) == Math.round(parseFloat(in1))) {
  //     } else if (system.y < system.x) {
  //       setIn1(in1 - 1)
  //     } else if (system.y > system.x) {
  //         setIn1(in1 + 1)
  //     }
  
  
  //   //
  //   system.x = parseFloat(in1);
  //   console.log(input_PID)
  //   system.zd = parseFloat(localStorage.getItem('input_PID'))
  //   system.transfer();
  //   //
  //   if (points.length > 150) {
  //     chart.data.labels.shift();
  //     points.shift();
  //   }
  //   chart.data.labels.push(system.time);
  //   points.push({
  //     x: system.time,
  //     y: system.y
  //   });
  //   chart.update();
    
  //   setResults(system.y)
  //   setTWater(system.y)
  // }

  // function run() {
  //   progress();
  //   setTimeout(function () {
  //     run()
  //   }, speed);
  // }

  // function scalling() {
  //   const calc = (TMinWater - TMaxWater) / (TMaxOutside - TMinOutside);
  //   return calc * TOutside + TMinWater
  // }

  // function calculateZD() {
  //   if(TOutside >= TMaxOutside) {
  //     localStorage.setItem('input_PID', TMinWater)
  //   } else if(TOutside <= TMinOutside) {
  //     localStorage.setItem('input_PID', TMaxWater)
  //   } else {
  //     localStorage.setItem('input_PID', scalling())
  //   }
  // }

  function run() {
      chart.update();
      console.log(props.TWater)
      setTimeout(function () {
        run()
      }, 100);
    }

  const applySettings = () => {
    // actionTMinWater(TMinWater),
    // actionTMaxWater(TMaxWater),
    // actionTMinOutside(TMinOutside),
    // actionTMaxOutside(TMaxOutside),
    // actionTOutside(TOutside)
  }


  return (
      <div className='schedules-main'>
          <NavBar/>
          <div className='schedules-main__options'>
            <label className='input-label'>TMinWater
                <input type='text' value={TMinWater} onChange={e => setTMinWater(e.target.value)} />
            </label>
            <label className='input-label'>TMaxWater
                <input type='text' value={TMaxWater} onChange={e => setTMaxWater(e.target.value)} />
            </label>
            <label className='input-label'>TMinOutside
                <input type='text' value={TMinOutside} onChange={e => setTMinOutside(e.target.value)} />
            </label>
            <label className='input-label'>TMaxOutside
                <input type='text' value={TMaxOutside} onChange={e => setTMaxOutside(e.target.value)} />
            </label>
            <label className='input-label'>TOutside
                <input type='text' value={TOutside} onChange={e => setTOutside(e.target.value)} />
            </label>
            <label className='input-label'>TWater
                <input type='text' value={props.TWater}  readOnly/>
            </label>
          </div>
          <div className='schedules-main__apply-block'>
            <span className='apply-btn' onClick={() => applySettings()}>Застосувати</span>
          </div>
          <canvas ref = {schedule} width='800' className='chart'/>
          {/* <span>{{results}}</span> */}
      </div>
  )
}

const mapStateToProps = state => {
  return {
      points: state.modeling.points,
      time: state.modeling.time,
      TWater: state.modeling.TWater
  }
}

const mapDispatchToProps = {
  actionTMinWater,
  actionTMaxWater,
  actionTMinOutside,
  actionTMaxOutside,
  actionTOutside
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedules)