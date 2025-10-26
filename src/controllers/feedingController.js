const feedingModel = require('../models/feedingModel');
const animalModel = require('../models/animalModel');

exports.registerFeeding = (req, res) => {
  const { animalId, horario, alimento, quantidade } = req.body;
  if (!animalId || !horario || !alimento || !quantidade) {
    return res.status(400).json({ error: 'Dados obrigatórios não informados' });
  }
  const animal = animalModel.getAnimalById(animalId);
  if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
  const feeding = feedingModel.createFeeding({ animalId, horario, alimento, quantidade });
  res.status(201).json(feeding);
};

exports.getFeedingsByAnimal = (req, res) => {
  const animalId = parseInt(req.params.animalId);
  const feedings = feedingModel.getFeedingsByAnimal(animalId);
  res.json(feedings);
};

exports.getAllFeedings = (req, res) => {
  res.json(feedingModel.getAllFeedings());
};
