import Specialty from '../models/Specialty';

class SpecialtyController {
  async index(req, res) {
    const specialty = await Specialty.findAll({
      attributes: ['id', 'name'],
      order: ['name'],
    });

    return res.json(specialty);
  }
}

export default new SpecialtyController();
