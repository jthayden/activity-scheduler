import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default class TennisComplexList extends Component {
    state = {
        tennis_complexes:[]
    }

componentDidMount() {
    this.getAllTennisComplexes()
}

getAllTennisComplexes = () => {
    axios.get('/api/v1/tenniscomplexes/')
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
                <Link to={`/tenniscomplexes/${tennis_complex.id}`}>
                <div id={tennis_complex.name}>
                    <img src={tennis_complex.photo_url} alt={tennis_complex.name} />
                    <h2>{tennis_complex.name}</h2>
                    <p>{tennis_complex.description}</p>
                </div>
                </Link>
            )
        })
        return (
            <div>
                <Button href="#Lake Club Tennis Center" className=''>The Lake Club Tennis Center</Button>
                <Button href="#The Landing Complex">The Landing Complex</Button>

                {tennisComplexList}
                <Link to={'/tenniscomplexes/create'}>Add Tennis Complex</Link>
            </div>
        )
    }
}
