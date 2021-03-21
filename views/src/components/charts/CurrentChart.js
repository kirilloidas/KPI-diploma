import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import './Chart.scss'
import { connect } from 'react-redux';

const CurrentChart = ({currentData, isGetCurrent}) => {
    const schedule = useRef(null);
    useEffect(() => {
        if(Object.keys(currentData).length != 0) {
            console.log(currentData)
            const ctx = schedule.current.getContext("2d");
            ctx.canvas.height = 500;
            let arrData = [currentData[0].data[19].value, currentData[1].data[19].value]
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
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    })

    return (
        <canvas ref = {schedule} width='800' className='chart'/>
    )
}

const mapStateToProps = state => {
    return {
        currentData: state.mainReducer.currentData,
        isGetCurrent: state.checkBoxReducer.isGetCurrent
    }
}

export default connect(mapStateToProps, null)(CurrentChart)