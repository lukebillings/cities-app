const City = require('../models/city-model')

createCity = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a City',
        })
    }

    const city = new City(body)

    if (!city) {
        return res.status(400).json({ success: false, error: err })
    }

    city
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: city._id,
                message: 'City created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'City not created!',
            })
        })
}

updateCity = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    City.findOne({ _id: req.params.id }, (err, city) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'City not found!',
            })
        }
        city.name = body.name
        city.rating = body.rating
        city
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: city._id,
                    message: 'City updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'City not updated!',
                })
            })
    })
}

deleteCity = async (req, res) => {
    await City.findOneAndDelete({ _id: req.params.id }, (err, city) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!city) {
            return res
                .status(404)
                .json({ success: false, error: `City not found` })
        }

        return res.status(200).json({ success: true, data: city })
    }).catch(err => console.log(err))
}

getCityById = async (req, res) => {
    await City.findOne({ _id: req.params.id }, (err, City) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!City) {
            return res
                .status(404)
                .json({ success: false, error: `City not found` })
        }
        return res.status(200).json({ success: true, data: City })
    }).catch(err => console.log(err))
}

getCities = async (req, res) => {
    await City.find({}, (err, cities) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!cities.length) {
            return res
                .status(404)
                .json({ success: false, error: `City not found` })
        }
        return res.status(200).json({ success: true, data: cities })
    }).catch(err => console.log(err))
}

module.exports = {
    createCity,
    updateCity,
    deleteCity,
    getCities,
    getCityById,
}
