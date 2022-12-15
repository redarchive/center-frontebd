import React from 'react'
import * as style from './style.module.scss'
import { Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import moment from 'moment'
Chart.register(CategoryScale)

interface Stats {
  date: string
  counter: number
  type: number
}

const ItemGraph = ({ data }: any): JSX.Element => {
  const getChartLabel = (): string[] => {
    return new Array(7)
      .fill(true)
      .map((_, i) =>
        moment()
          .subtract(i, 'days')
          .format('YYYY-MM-DD'))
      .reverse()
  }

  const getChartData = (type: number): number[] => {
    return getChartLabel()
      .map((date) =>
        data.stats.find((stat: Stats) =>
          stat.type === type && stat.date === date)?.counter ?? 0)
  }

  return (
    <div className={style.graph}>
      <Line data={{
        labels: getChartLabel(),
        datasets: [
          {
            label: '로그인 횟수',
            data: getChartData(1),
            fill: true,
            backgroundColor: 'rgba(42,156,212,.1)',
            borderColor: 'rgba(42,156,212,1)',
            borderWidth: 2
          },
          {
            label: '조회수',
            data: getChartData(0),
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
