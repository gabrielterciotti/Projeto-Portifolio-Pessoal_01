let feedings = [];
let idCounter = 1;

exports.createFeeding = (data) => {
  const feeding = { id: idCounter++, ...data };
  feedings.push(feeding);
  return feeding;
};

exports.getFeedingsByAnimal = (animalId) => feedings.filter(f => f.animalId === animalId);


exports.getAllFeedings = () => feedings;

exports.deleteFeeding = (id) => {
  const idx = feedings.findIndex(f => f.id === id);
  if (idx === -1) return false;
  feedings.splice(idx, 1);
  return true;
};
