import React, { useEffect } from 'react'
import 'CurrentChart.scss'

const CurrentChart = () => {
    useEffect(() => {
        const ctx = schedule.current.getContext("2d");
        ctx.canvas.height = 500;

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
        let gradient = ctx.createLinearGradient(0, 25, 0, 300);
            gradient.addColorStop(0, colors.purple.half);
            gradient.addColorStop(0.35, colors.purple.quarter);
            gradient.addColorStop(1, colors.purple.zero);

        new Chart(bar_ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 8, 14, 5],
                                backgroundColor: purple_orange_gradient,
                                hoverBackgroundColor: purple_orange_gradient,
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
    })

    return (
        <canvas ref = {schedule} width='800' className='chart'/>
    )
}