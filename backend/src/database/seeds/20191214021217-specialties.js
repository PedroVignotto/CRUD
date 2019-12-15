module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'specialties',
      [
        {
          name: 'Alergologia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Angiologia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Buco maxilo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cardiologia clínica',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cardiologia infantil',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia cabeça e pescoço',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia cardíaca',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia de torax',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia geral',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia pediátrica',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia plástica',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia torácic',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cirurgia vascular',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Clínica médica',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
