import React, { Component } from 'react'
import axios from 'axios'


export default class TennisComplexList extends Component {
    state = {
        tennis_complexes:[]
    }

componentDidMount() {
    this.getAllTennisComplexes()
}

getAllTennisComplexes = () => {
    axios.get('/api/v1/tenniscomplexs/')
    .then(res => {
        this.setState({ tennis_complexes: res.data })
    })
    .catch(err => {
        console.log(err)
    })
}

    render() {
        let tennisComplexList = this.state.tennis_complexes.map((tennis_complex) => {
            return (
                <div>
                    <img src={tennis_complex.photo_url} alt={tennis_complex.name} />
                    <h2>{tennis_complex.name}</h2>
                    <p>{tennis_complex.description}</p>
                </div>
            )
        })
        return (
            <div>
                {tennisComplexList}
            </div>
        )
    }
}
