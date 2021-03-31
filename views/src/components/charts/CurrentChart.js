import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import './Chart.scss';
import {CurrentObject} from '../../objectsDataChart/CurrentObject'
import { connect } from 'react-redux';

const CurrentChart = ({currentData, isGetCurrent, currentParamOption, isCurrent}) => {
    const schedule = useRef(null);
    const [numberParam, setNumbarParam] = useState(0)

    useEffect(() => {
        Object.keys(CurrentObject).map((item, index) => {
            // console.log(item, index)
            if(item == currentParamOption) {
                console.log(item)
                setNumbarParam(index);
            }
        })
    }, [currentParamOption])

    useEffect(() => {
        console.log(currentData)
        if(Object.keys(currentData).length != 0) {
            console.log(currentData)
            const ctx = schedule.current.getContext("2d");
            ctx.canvas.height = 500;
            let arrData = [currentData[0].data[numberParam].value, currentData[1].data[numberParam].value]
            // let arrData = []
            const colors = {
                purple: {
                    default: "rgba(149, 76, 233, 1)",
                    half: "rgba(149, 76, 233, 0.5)",
                    quarter: "rgba(149, 76, 233, 0.25)",
                    zero: "rgba(149, 76, 233, 0)"
                },
                indigo: {
                    default: "rgba(80, 102, 120, 1)",
                    quarter: "rgba(80, 102, 120, 0.25)"
                }
            };
                var gradient = ctx.createLinearGradient(0, 0, 0, 600);
                gradient.addColorStop(0, 'orange');
                gradient.addColorStop(1, 'purple');
            

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Перший", "Другий"],
                    datasets: [{
                        label: '# of Votes',
                        data: arrData,
                                    backgroundColor: gradient,
                                    hoverBackgroundColor: gradient,
                                    hoverBorderWidth: 2,
                                    hoverBorderColor: 'purple'
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 16
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 16,
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    }, [numberParam, isCurrent, currentData])

    return (
        <canvas ref = {schedule} width='800' className='chart'/>
    )
}

const mapStateToProps = state => {
    return {
        isCurrent: state.mainReducer.isCurrent,
        currentData: state.mainReducer.currentData,
        isGetCurrent: state.checkBoxReducer.isGetCurrent,
        currentParamOption: state.checkBoxReducer.currentParamOption
    }
}

export default connect(mapStateToProps, null)(CurrentChart)