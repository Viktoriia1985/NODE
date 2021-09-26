const router = require('express').Router();

const { carController } = require('../controllers');
const { checkUniqueVinCode, isCarPresent } = require('../middlewares/car.middleware');
// const { getSingleCar } = require('../controllers/car.controller');

router.post('/', checkUniqueVinCode, carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:car_id', isCarPresent, carController.getSingleCar);
router.patch('/:car_id', isCarPresent, checkUniqueVinCode, carController.updateCar);
router.delete('/:car_id', isCarPresent, carController.deleteCar);

module.exports = router;
