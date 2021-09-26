const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');
const { carService } = require('../services');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const car = await carService.getCarById(car_id);

            if (!car) {
                throw new ErrorHandler(418, 'car is not found');
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUniqueVinCode: async (req, res, next) => {
        try {
            const { vinCode } = req.body;

            const carByVinCode = await Car.findOne({ vinCode });

            if (carByVinCode) {
                throw new ErrorHandler(409, `VinCode ${vinCode} is already exist`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
