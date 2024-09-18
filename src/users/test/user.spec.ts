import { Sequelize } from 'sequelize-typescript';
import { UsersEntity } from '../entities/users.entity';
import { faker } from '@faker-js/faker';

describe('UsersEntity', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [UsersEntity],
    });

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a user successfully', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const user = await UsersEntity.create({
      name: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(firstName);
    expect(user.lastname).toBe(lastName);
    expect(user.email).toBe(email);
    expect(user.password).toBe(password);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should validate the name field', async () => {
    const firstName = faker.person.firstName();

    const user = await UsersEntity.create({
      name: firstName,
    });

    expect(user.name).toBe(firstName);
    expect(typeof user.name).toBe('string');
    expect(user.name).not.toBeNull();
    expect(user.name).toBeDefined();
  });

  it('should validate the lastName field', async () => {
    const lastName = faker.person.lastName();

    const user = await UsersEntity.create({
      lastname: lastName,
    });

    expect(user.lastname).toBe(lastName);
    expect(typeof user.lastname).toBe('string');
    expect(user.lastname).not.toBeNull();
    expect(user.lastname).toBeDefined();
  });

  it('should validate the email field', async () => {
    const email = faker.internet.email();

    const user = await UsersEntity.create({
      email: email,
    });

    expect(user.email).toBe(email);
    expect(typeof user.email).toBe('string');
    expect(user.email).not.toBeNull();
    expect(user.email).toBeDefined();
  });

  it('should validate the password field', async () => {
    const password = faker.internet.password();

    const user = await UsersEntity.create({
      password: password,
    });

    expect(user.password).toBe(password);
    expect(typeof user.password).toBe('string');
    expect(user.password).not.toBeNull();
    expect(user.password).toBeDefined();
  });

  it('should delete a user successfully', async () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const user = await UsersEntity.create({
      name: firstName,
      lastname: lastName,
      email: email,
      password: password,
    });

    const deleteCount = await UsersEntity.destroy({
      where: { id: user.id },
    });

    expect(deleteCount).toBe(0);

    // Verify the user was deleted
    const deletedUser = await UsersEntity.findByPk(user.id);
    expect(deletedUser).toBeNull();
  });

});
