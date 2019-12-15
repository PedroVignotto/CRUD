module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DoctorSpecialties', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'doctors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      specialty_id: {
        type: Sequelize.INTEGER,
        references: { model: 'specialties', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('DoctorSpecialties');
  },
};
