import Sequelize, { Model } from 'sequelize';

class Doctor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        crm: Sequelize.STRING,
        telephone: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Specialty, {
      through: 'DoctorSpecialties',
      foreignKey: 'doctor_id',
      as: 'specialties',
    });
  }
}

export default Doctor;
