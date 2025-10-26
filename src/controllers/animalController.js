const animalModel = require('../models/animalModel');

exports.registerAnimal = (req, res) => {
  const { nome, idade, especie, tutor } = req.body;
  if (!nome || !idade || !especie || !tutor) {
    return res.status(400).json({ error: 'Dados obrigatórios não informados' });
  }
  const animal = animalModel.createAnimal({ nome, idade, especie, tutor });
  res.status(201).json(animal);
};

exports.getAnimal = (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animalModel.getAnimalById(id);
  if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
  res.json(animal);
};

exports.getAllAnimals = (req, res) => {
  res.json(animalModel.getAllAnimals());
};

exports.updateAnimal = (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animalModel.updateAnimal(id, req.body);
  if (!animal) return res.status(404).json({ error: 'Animal não encontrado' });
  res.json(animal);
};

exports.deleteAnimal = (req, res) => {
  const id = parseInt(req.params.id);
  const ok = animalModel.deleteAnimal(id);
  if (!ok) return res.status(404).json({ error: 'Animal não encontrado' });
  res.status(204).send();
};
