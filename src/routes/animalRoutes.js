const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.post('/', animalController.registerAnimal);
router.get('/', animalController.getAllAnimals);
router.get('/:id', animalController.getAnimal);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

module.exports = router;
