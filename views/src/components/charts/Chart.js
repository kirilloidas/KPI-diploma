import React, {
    useEffect,
    useRef
} from 'react'
import Chart from 'chart.js'
import {
    connect
} from 'react-redux'
import './Chart.scss'
import 'chartjs-plugin-style';

const ChartData = ({
    checkBoxObj,
    dataToChart,
    isData
}) => {
    const schedule = useRef(null);
    useEffect(() => {
        if(isData) {
            const colors = {
                purple: {
                    // default: "rgba(149, 76, 233, 1)",
                    // half: "rgba(149, 76, 233, 0.6)",
                    // quarter: "rgba(149, 76, 233, 0.3)",
                    // zero: "rgba(149, 76, 233, 0)"
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
            const ctx = schedule.current.getContext("2d");
            let draw = Chart.controllers.line.prototype.draw;
            console.log(Chart.controllers)
            Chart.controllers.line = Chart.controllers.line.extend({
                draw: function() {
                    console.log('k')
                    draw.apply(this, arguments);
                    let ctx = this.chart.chart.ctx;
                    let _stroke = ctx.stroke;
                    ctx.stroke = function() {
                        ctx.save();
                        ctx.shadowColor = 'red';
                        ctx.shadowBlur = 10;
                        ctx.shadowOffsetX = 0;
                        ctx.shadowOffsetY = 4;
                        _stroke.apply(this, arguments)
                        ctx.restore();
                    }
                }
            });

            
            ctx.canvas.height = 500;
            let gradient = ctx.createLinearGradient(0, 0, 0, 500);
            gradient.addColorStop(0, colors.purple.half);
            gradient.addColorStop(0.35, colors.purple.quarter);
            gradient.addColorStop(1, colors.purple.zero);


            new Chart(ctx, {
                type: "line",
                data: {
                    labels: dataToChart.date,
                    datasets: [{
                        fill: true,
                        backgroundColor: gradient,
                        pointBackgroundColor: colors.purple.default,
                        borderColor: colors.purple.default,
                        data: dataToChart.dataArr[8],
                        lineTension: 0.4,
                        borderWidth: 4,
                        pointRadius: 5
                    }]
                },
                options: {
                    layout: {
                        padding: 10
                    },
                    responsive: true,
                    legend: {
                        display: false
                    },

                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                padding: 10,
                                autoSkip: false,
                                maxRotation: 15,
                                minRotation: 15,
                                fontSize: 16,
                                fontColor: 'rgba(255,255,255,.7)'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                // labelString: "Weight in KG",
                                padding: 10
                            },
                            gridLines: {
                                display: true,
                                color: colors.indigo.quarter
                            },
                            ticks: {
                                beginAtZero: false,
                                // max: 63,
                                // min: 57,
                                padding: 10,
                                fontSize: 16,
                                fontColor: 'rgba(255,255,255,.7)'
                            }
                        }]
                    }
                }
            });
        }
    }, [isData])

    return ( 
        <canvas ref = {schedule} width='800' className='chart'/>
    )
}

const mapStateToProps = state => {
    return {
        dataToChart: state.checkBoxReducer.dataToChart,
        checkBoxObj: state.checkBoxReducer.checkBoxObj,
        isData: state.checkBoxReducer.isData
    }
}

export default connect(mapStateToProps, null)(ChartData)