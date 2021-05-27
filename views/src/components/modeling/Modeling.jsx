import React, { useEffect, useState } from 'react'
import ControlSystem from './ControlSystem';
import { connect } from 'react-redux'
import { actionTWater, actionPointsModeling, actionTimeModeling } from '../../redux/actions/modeling'

const Modeling = (props) => {
    const [speed, setSpeed] = useState(300);
    const [points, setPoints] = useState([]);
    const [results, setResults] = useState(0);
    const [in1, setIn1] = useState(0);
    const [labels, setLabels] = useState([]);
    const [pointsArray, setPointsArray] = useState([])

    const system = new ControlSystem(1)

    useEffect(() => {
        sessionStorage.setItem('input_PID', 50)
        run()
    }, [])

    function progress() {  
        calculateZD()      
        if (Math.round(system.y) == Math.round(parseFloat(in1))) {
        } else if (system.y < system.x) {
          setIn1(in1 - 1)
        } else if (system.y > system.x) {
            setIn1(in1 + 1)
        }
    
      //
      system.x = parseFloat(in1);
      system.zd = parseFloat(sessionStorage.getItem('input_PID'))
      system.transfer();
      //
      if (pointsArray.length > 150) {
        // chart.data.labels.shift();
        labels.shift()
        props.actionTimeModeling(labels)
        pointsArray.shift();
        props.actionPointsModeling(pointsArray)
      }
      labels.push(system.time)
      props.actionTimeModeling(labels)
    //   chart.data.labels.push(system.time);
      
    pointsArray.push({
        x: system.time,
        y: system.y
      });
      props.actionPointsModeling(pointsArray)
    //   chart.update();
    //   console.log(system.y)
      // actionTWater(system.y)
      sessionStorage.setItem('TWater', system.y)
    }

    function run() {
        progress();
        setTimeout(function () {
          run()
        }, speed);
    }

    function scalling() {
        const calc = (sessionStorage.getItem('TMinWater') - sessionStorage.getItem('TMaxWater')) / (sessionStorage.getItem('TMaxOutside') - sessionStorage.getItem('TMinOutside'));
        // const calc = (props.TMinWater - props.TMaxWater) / (props.TMaxOutside - props.TMinOutside);
        return calc * sessionStorage.getItem('TOutside') + sessionStorage.getItem('TMinWater')
        // return calc * props.TOutside + props.TMinWater
      }
  
    function calculateZD() {
        if(sessionStorage.getItem('TOutside') >= sessionStorage.getItem('TMaxOutside')) {
          sessionStorage.setItem('input_PID', props.TMinWater)
        } else if(sessionStorage.getItem('TOutside') <= sessionStorage.getItem('TMinOutside')) {
          sessionStorage.setItem('input_PID', props.TMaxWater)
        } else {
          sessionStorage.setItem('input_PID', scalling())
        }
      }

    return (
        <div style={{display: 'none'}}></div>
    )
}

const mapStateToProps = state => {
    return {
        TMinWater: state.modeling.TMinWater,
        TMaxWater: state.modeling.TMaxWater,
        TMinOutside: state.modeling.TMinOutside,
        TMaxOutside: state.modeling.TMaxOutside,
        TOutside: state.modeling.TOutside,
        TWater: state.modeling.TWater,
        start: state.modeling.start,
        // points: state.modeling.points,
        // time: state.modeling.time
    }
}

const mapDispatchToProps = {
    actionTWater,
    actionTimeModeling,
    actionPointsModeling
}

export default connect(mapStateToProps, mapDispatchToProps)(Modeling)