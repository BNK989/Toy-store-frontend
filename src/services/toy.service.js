import { httpService } from './http.service'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilterBy,
    getDefaultSort,
    getLabels,
    getLabelsMap
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

function getLabels() {
    return [...labels]
}


function getLabelsMap() {
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
    return query(emptyFilter,emptySort).then(toys => {
        // console.log('toys.length:', toys.length)
        
        const objMap = toys.reduce((acc, toy) => {
            toy.labels.forEach((label) => {
                if (!acc[label]) {
                    acc[label] = 1
                } else {
                    acc[label] += 1
                }
            })
            return acc
        }, {})
        
        
        // console.log('objMap:', objMap)
        return objMap
    })

}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: 'true'
    }
}

function getDefaultFilterBy() {
    return {
        txt: '',
        maxPrice: Infinity,
        labels: [],
        inStock: null
    }
}

function getDefaultSort() {
    return {
        by: 'name',
        asc: true
    }
}
