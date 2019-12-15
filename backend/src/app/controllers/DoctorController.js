import * as Yup from 'yup';
import { Op } from 'sequelize';
import Doctor from '../models/Doctor';
import Specialty from '../models/Specialty';

class DoctorController {
  async index(req, res) {
    const { q = null } = req.query;

    const doctor = await Doctor.findAll({
      where: { name: { [Op.like]: `%${q}%` } },
      attributes: ['id', 'name', 'crm', 'telephone', 'city', 'state'],
      order: ['name'],
      include: [
        {
          model: Specialty,
          as: 'specialties',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(doctor);
  }

  async show(req, res) {
    const { id } = req.params;

    const doctor = await Doctor.findOne({
      where: { id },
      attributes: ['id', 'name', 'crm', 'telephone', 'city', 'state'],
      include: [
        {
          model: Specialty,
          as: 'specialties',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });

    return res.json(doctor);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      crm: Yup.string().required(),
      telephone: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      specialties: Yup.array()
        .required()
        .min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Algo deu errado, verifique seus dados' });
    }

    const { specialties, ...data } = req.body;
    const { crm } = data;

    const crmExist = await Doctor.findOne({ where: { crm } });

    if (crmExist) {
      return res.status(400).json({ error: 'CRM já cadastrado' });
    }

    const doctor = await Doctor.create(data);

    doctor.setSpecialties(specialties);

    const { id, name, telephone, city, state } = doctor;

    return res.json({ id, name, crm, telephone, city, state });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      crm: Yup.string(),
      telephone: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      specialties: Yup.array().min(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Algo deu errado, verifique seus dados' });
    }

    const { id } = req.params;
    const { specialties, ...data } = req.body;
    const { crm } = data;

    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(400).json({ error: 'Médico não encontrado' });
    }

    if (crm && crm !== doctor.crm) {
      const crmExist = await Doctor.findOne({ where: { crm } });

      if (crmExist) {
        return res.status(400).json({ error: 'CRM já cadastrado' });
      }
    }

    const { name, telephone, city, state } = await doctor.update(data);

    if (specialties) {
      doctor.setSpecialties(specialties);
    }

    return res.json({ id, crm, name, telephone, city, state });
  }

  async delete(req, res) {
    const { id } = req.params;

    const doctor = await Doctor.findByPk(id);

    if (!doctor) {
      return res.status(400).json({ error: 'Médico não encontrado' });
    }

    await doctor.destroy();

    return res.status(200).json();
  }
}

export default new DoctorController();
