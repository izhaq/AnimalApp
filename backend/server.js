const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

const types = ['cat', 'dog', 'tiger', 'parrot', 'snake', 'hippo'];
const colors = ['black', 'white', 'red', 'orange', 'purple'];
const weights = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const lengths = [10, 20, 30, 40, 50, 60, 70];

buildArray = (numberOfAnimals) => {
  const animalsArray = [];

  for (let i = 0; i < numberOfAnimals ; i++) {
    animalsArray.push({
      'type': types[Math.floor(Math.random() * types.length)],
      'color': colors[Math.floor(Math.random() * colors.length)],
      'weight': weights[Math.floor(Math.random() * weights.length)],
      'length': lengths[Math.floor(Math.random() * lengths.length)],
    });
  }

  return animalsArray;
}

const animalsArray = buildArray(100);

app.get('/getAnimalsList', (req, res) => {
  res.json(animalsArray);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
