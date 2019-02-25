import models from '../db/models';

const { Meal } = models;

class MealController {
  static createMeal(req, res) {
    const {
      name,
      price,
      quantity,
    } = req.body;

    const { fullName } = req.authUser;

    Meal.create({
      name,
      price,
      quantity,
      store: fullName,
    })
      .then(() => {
        res.status(201).send({
          statusText: 'Created',
          status: 201,
          message: 'Meal created successfully',
        });
      })
      .catch(() => {
        res.status(500).send({
          statusText: 'Internal server error',
          status: 500,
          message: 'A server error occured'
        });
      });
  }
}

export default MealController;
