import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import { connect } from 'react-redux'

const ChartData = ({checkBoxObj, dataToChart}) => {
    const schedule = useRef(null);
    useEffect(() => {
        const ctx = schedule.current;

        new Chart(ctx, {
            type: 'line',
            data: {
              labels: dataToChart.date,
              datasets: [{
                label: 'Об`єм (маса) каналу витрати 1',
                data: dataToChart.dataArr[8],
                backgroundColor: undefined,
                borderColor: 'yellow'
              }]
            },
            options: {
                // All of my other bar chart option here
                scales: {
                    yAxes: [{
                        gridLines: { 
                            color: "#CCC" 
                        },
                        ticks: {
                            beginAtZero:true,
                            fontColor: "#CCC",
                            fontSize: 28
                        }
                    }],
                    xAxes: [{
                        gridLines: { 
                            color: "#CCC"
                        },
                        ticks: {
                            fontColor: "#CCC",
                            fontSize: 28
                        }
                    }]
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        fontColor: '#198ada',
                        fontSize: 40,
                        fontFamily: 'Helvetica'
                    }
                }
            }
        });
    }, [])

    return (
        <canvas ref={schedule} style={{height: '300px', width: '600px'}} />
    )
}

const mapStateToProps = state => {
    return {
        dataToChart: state.checkBoxReducer.dataToChart,
        checkBoxObj: state.checkBoxReducer.checkBoxObj
    }
}

export default connect(mapStateToProps, null)(ChartData)