const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query

        //console.log(request.query)

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs:{
                $in: techsArray
            },
            locationDev:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 2000,

                }
            }
        })

        return response.json({ devs })
    }
}