const Car = require('../dataBase/Car');

module.exports = {
    getAllCars: () => Car.find({}),
    getCarById: (_id) => Car.findById(_id),
    createCar: (data) => Car.create(data),
    updateCar: (_id, data) => Car.updateOne({ _id }, data),
    deleteCar: (_id) => Car.deleteOne({ _id }),
};
