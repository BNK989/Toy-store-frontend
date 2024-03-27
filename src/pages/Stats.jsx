import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { toyActions } from '../store/actions/toy.action'
import {toyService} from '../services/toy.service'


ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Boys', 'Girls', 'Yellow', 'Green', 'Purple', 'Orange', 'black'],
  datasets: [
      {
          label: '# of Votes',
      data: [120, 190, 30, 50, 20, 30, 60],
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(153, 102, 255, 1)',
    ],
    borderWidth: 1,
},
],
};

const emptyFilter = {
    txt: '',
    maxPrice: Infinity,
    labels: [],
    inStock: null
}

const emptySort = {
    by: 'name',
    asc: true
}

export function Stats() {
    const toys = useSelector((state) => state.toyModule.toys)

    const [toyData, setToyData] = useState(data)


    useEffect(() => {
        toyActions.loadToys(emptyFilter, emptySort)
            .then(() => {
                toyService.getLabelsMap()
                    .then((objMap) => {
                        const keys = Object.keys(objMap)
                        const values = Object.values(objMap)
                        console.log('keys:', [...keys])
                        console.log('values:', values)
                        setToyData(prev => ({ ...prev, labels: [...keys]}))
                        setToyData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: [...values] }] }))

                    })
            })
    }, [])

    return (<>
    <p>Total toys: {toys.length}</p>
    <div className="chart-container">
    <Pie data={toyData} updateMode="resize" />
    </div>
    </>)
}
