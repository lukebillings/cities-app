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

class CitiesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    handleUpdateCity = async () => {
        const { id, name, rating } = this.state
        const payload = { name, rating }

        await api.updateCityById(id, payload).then(res => {
            window.alert(`City updated successfully`)
            this.setState({
                name: '',
                rating: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const city = await api.getCityById(id)

        this.setState({
            name: city.data.data.name,
            rating: city.data.data.rating
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

                <Button onClick={this.handleUpdateCity}>Update city</Button>
                <CancelButton href={'/cities/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CitiesUpdate
