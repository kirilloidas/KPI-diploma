import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import NavBar from '../../components/navbar/Navbar';
import ControlSystem from './ControlSystem';
import Chart from 'chart.js'
import './Schedules.scss'

export const Schedules = () => {
    const [speed, setSpeed] = useState(100);
    const [points, setPoints] = useState([]);
    const [results, setResults] = useState(0);
    const [in1, setIn1] = useState(0);
    const [input_PID, setInput_PID] = useState(50)
    const chartCfg = {
        type: 'line',
        data: {
          datasets: [{
            data: points,
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            lineTension: 0,
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
                max: 100,
                min: 0
              }
            }]
          }
        }
      };
    
    const system = new ControlSystem(1)
    const schedule = useRef(null)

    useEffect(() => {
      console.log('yessss')
      initialize();
      run();
    }, [])

    function initialize() {
      window.chart = new Chart(schedule.current.getContext("2d"), chartCfg);
    }

    function setOptions() {
      system.pid.K = 2;
      system.pid.Ti = 0.1;
      system.pid.Td = 0;
      // console.log(system.pid);
    }

    function progress() {

      setOptions();
        
        if (Math.round(system.y) == Math.round(parseFloat(in1))) {
          // in1.value = in1.value;
        } else if (system.y < system.x) {
          setIn1(in1 - 1)
            // in1.value--;
        } else if (system.y > system.x) {
            // in1.value++;
            setIn1(in1 + 1)
        }
    
    
      //
      system.x = parseFloat(in1);
      system.zd = parseFloat(input_PID);
      system.transfer();
      //
      if (points.length > 150) {
        window.chart.data.labels.shift();
        points.shift();
      }
      window.chart.data.labels.push(system.time);
      points.push({
        x: system.time,
        y: system.y
      });
      window.chart.update();
      
      setResults(system.y)
    }

    function run() {
      progress();
      setTimeout(function () {
        requestAnimationFrame(run);
      }, speed);
    }

    return (
        <div className='schedules-main'>
            <NavBar/>
            <canvas ref = {schedule} width='800' className='chart'/>
            {/* <span>{{results}}</span> */}
        </div>
    )
}

export default connect(null, null)(Schedules)