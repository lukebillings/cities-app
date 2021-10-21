import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class CitiesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            rating: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.validity.valid
            ? event.target.value
            : this.state.rating

        this.setState({ rating })
    }

    handleIncludeCity = async () => {
        const { name, rating } = this.state
        const payload = { name, rating }

        await api.insertCity(payload).then(res => {
            window.alert(`City inserted successfully`)
            this.setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

    render() {
        const { name, rating } = this.state
        return (
            <Wrapper>
                <Title>Create City</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Rating: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={rating}
                    onChange={this.handleChangeInputRating}
                />

                <Button onClick={this.handleIncludeCity}>Add City</Button>
                <CancelButton href={'/cities/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CitiesInsert
