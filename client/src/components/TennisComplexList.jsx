import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

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
                <div>
                
                <ButtonBase focusRipple key={tennis_complex.name} className='image' id={tennis_complex.name}>
                    {/* <span className='imageSrc'/> */}
                    <img src={tennis_complex.photo_url} alt={tennis_complex.name}/>
                    {/* <span className='imageBackdrop'/> */}
                    <span className='imageButton'>
                    <Link to={`/tenniscomplexes/${tennis_complex.id}`}>
                        <Typography
                            component='span'
                            // variant='subtitle1'
                            // color='white'
                            className='imageTitle'
                            >{tennis_complex.name}
                            {/* <span className='imageMarked' /> */}
                            </Typography>
                            </Link>
                            </span>
                </ButtonBase>
                <p>{tennis_complex.description}</p>
                
                <hr />
                </div>
            )
        })
        return (
            <div>
                <Button href="#Lake Club Tennis Complex" className=''>The Lake Club Tennis Center</Button>
                <Button href="#The Landing Complex">The Landing Complex</Button>

                {tennisComplexList}
                {/* <Link to={'/tenniscomplexes/create'}>Add Tennis Complex</Link> */}
            </div>
        )
    }
}
