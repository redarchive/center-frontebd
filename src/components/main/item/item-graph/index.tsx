import React from 'react'
import * as style from './style.module.scss'
import { Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
Chart.register(CategoryScale)

const ItemGraph = (): JSX.Element => {
  return (
    <div className={style.graph}>
      <Line data={{
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: '로그인 횟수',
            data: [0, 100, 200, 300, 500, 600, 1000],
            fill: true,
            backgroundColor: 'rgba(42,156,212,.1)',
            borderColor: 'rgba(42,156,212,1)',
            borderWidth: 2
          },
          {
            label: '조회수',
            data: [0, 100, 200, 300, 500, 600, 1000],
            fill: true,
            backgroundColor: 'rgba(255,0,0,0.1)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 2
          }
        ]
      }} />
    </div>
  )
}

export default ItemGraph
