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
      });
  }

  static getAllMeals(req, res) {
    Meal.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    })
      .then((response) => {
        res.status(200).send({
          statusText: 'Ok',
          status: 200,
          message: 'Returned all meals',
          data: response,
        });
      });
  }
}

export default MealController;
