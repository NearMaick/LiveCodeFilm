import User from '../models/User';

class UserController {
  // store, update, delete, index, show
  async store(req, res) {
    const { email } = req.body;

    const checkUser = await User.findOne({ where: { email } });
    // http codes: 400, 200, 201, 401
    if (checkUser) {
      return res
        .status(400)
        .json({ error: { message: 'User already exists.' } });
    }

    const { id, name } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const checkUser = await User.findOne({ where: { email } });

      if (checkUser) {
        return res
          .status(401)
          .json({ error: { message: 'User alredy exists' } });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(400)
        .json({ error: { message: 'Password does not match' } });
    }

    await user.update(req.body);

    const { id, name } = await User.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: { message: 'User not Found' } });
    }

    await user.destroy();

    return res.json();
  }
}

export default new UserController();
