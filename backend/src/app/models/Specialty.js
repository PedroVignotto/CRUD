import Sequelize, { Model } from 'sequelize';

class Specialty extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Doctor, {
      through: 'DoctorSpecialties',
      foreignKey: 'specialty_id',
      as: 'doctors',
    });
  }
}

export default Specialty;
