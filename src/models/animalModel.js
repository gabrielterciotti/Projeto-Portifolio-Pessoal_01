let animals = [];
let idCounter = 1;

exports.createAnimal = (data) => {
  const animal = { id: idCounter++, ...data };
  animals.push(animal);
  return animal;
};

exports.getAnimalById = (id) => animals.find(a => a.id === id);

exports.getAllAnimals = () => animals;

exports.updateAnimal = (id, data) => {
  const idx = animals.findIndex(a => a.id === id);
  if (idx === -1) return null;
  animals[idx] = { ...animals[idx], ...data };
  return animals[idx];
};

exports.deleteAnimal = (id) => {
  const idx = animals.findIndex(a => a.id === id);
  if (idx === -1) return false;
  animals.splice(idx, 1);
  return true;
};
