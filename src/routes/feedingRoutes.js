const express = require('express');
const router = express.Router();
const feedingController = require('../controllers/feedingController');

router.post('/', feedingController.registerFeeding);
router.get('/', feedingController.getAllFeedings);
router.get('/:animalId', feedingController.getFeedingsByAnimal);
router.delete('/:id', feedingController.deleteFeeding);

module.exports = router;
