class MealMiddleware {
  static validateCreateMeal(req, res, next) {
    const user = req.authUser;
    const userType = 'admin' || 'caterer';
    const {
      name,
      price,
      quantity,
    } = req.body;

    let errors = false;
    if (!name) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Name cannot be empty',
      };
    }
    if (!price) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Price cannot be empty',
      };
    }
    if (!quantity) {
      errors = {
        statusText: 'Bad Request',
        status: 400,
        message: 'Quantity cannot be empty',
      };
    }

    if (user.userType !== userType) {
      errors = {
        statusText: 'Unauthorized',
        status: 401,
        message: 'Only admins and caterers can create meals',
      };
    }

    if (errors) {
      return res.status(errors.status).send(errors);
    }

    next();
  }
}

export default MealMiddleware;
