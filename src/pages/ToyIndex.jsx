
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ToyList } from '../cmps/ToyList'
import { ToyFilter } from '../cmps/ToyFilter'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.action'
import { toyService } from '../services/toy.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ToySort } from '../cmps/ToySort'

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)
    // const {toys }= useSelector((state) => state.toyModule)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    useEffect(() => {
        // console.log('filterBy:', filterBy)
        loadToys(filterBy, sortBy)
            .then(() => {
                // console.log('Loaded successfully')
            })
            .catch((err) => {
                showErrorMsg('Oops.. something went wrong, try again')
            })
    }, [filterBy, sortBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed successfully')
            })
            .catch(err => {
                showErrorMsg('Cant remove toy, try again.')
            })
    }

    function onSetFilter(filterBy) {

        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    if (!toys || !toys.length) return <div>Loading...</div>
    return (
        <div className="toy-app">
            <section className="main-control-container">
                <NavLink to="/toy/edit" className="btn-add">Add Toy</NavLink>

                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <ToyList toys={toys} onRemove={onRemoveToy} />
        </div>
    )
}



