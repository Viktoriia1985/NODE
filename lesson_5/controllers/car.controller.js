const { carService } = require('../services');

module.exports = {
    getSingleCar: (req, res, next) => {
        try {
            const { car } = req;

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createCar = await carService.createCar(req.body);

            res.status(201).json(createCar);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carService.updateCar(car_id, req.body);

            res.status(201).json(`car with id ${car_id} is updated successfully`);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carService.deleteCar(car_id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};
