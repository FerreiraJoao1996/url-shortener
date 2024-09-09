'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            len: {
                args: [3,255],
                msg: 'Campo nome deve ter entre 3 e 255 caracteres'
            }
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            len: {
                args: [3,255],
                msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres.'
            }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: 'E-mail já está cadastrado!'
        },
        validate: {
          isEmail: {
              msg: 'E-mail inválido!'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: NULL
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
