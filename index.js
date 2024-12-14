import express from 'express';
import { loggingMiddleware } from './LoggingMiddleware.js';

let cars = [
    { id: 1, model: "tata", make: 2000 },
    { id: 2, model: "maruti", make: 2000 },
    { id: 3, model: "honda", make: 2000 },
    { id: 4, model: "mahindra", make: 2000 },
    { id: 5, model: "toyota", make: 2000 },
    { id: 6, model: "ford", make: 2000 },
  ];

  const port = 4040;
  const hostname = "127.0.0.1";

  const app = express();
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(loggingMiddleware);

  app.post('/add/car', async (req, res) => {
      const newCar = req.body;
      cars.push(newCar);
      res.status(201).send(cars);
  })

  app.get('/get/car', async (req, res) => {
    res.status(200).send(cars);
  })

  app.put('/update/cars/:id', async (req, res) => {
    const {id} = req.params;

    const dataToEdit = req.body;
    const updatedCars = cars.map((car) => {
        return car.id === Number(id) ? dataToEdit : car;
    });

    res.status(200).send(updatedCars);
  })

  app.delete('/delete/cars/:id', async (req, res) => {
    const {id} = req.params;

    const carToDelete = cars.filter((car) => {
        return car.id != Number(id);
    });

    res.status(200).send(carToDelete);
  })


  app.listen(port, hostname, () => {
    console.log(`Server has started at ${port}`);
  })