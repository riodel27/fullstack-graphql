const { UserInputError } = require('apollo-server');

const { validateCreateAdministrator, validateLogin } = require('../../util/validators');
const AdministratorService = require('../../services/administrator.service');

module.exports = {
  Query: {
    async administrators() {
      const administrators = await AdministratorService.listsOfAdministrator();
      return administrators;
    },
  },
  Mutation: {
    async createAdministrator(_, args) {
      const {
        name,
        email,
        password,
      } = args;

      const { valid, errors } = validateCreateAdministrator(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const admin = await AdministratorService.findOneAdministrator({ email });

      if (admin) {
        throw new UserInputError('Email already exist', { invalidArgs: Object.keys(args) });
      }

      const administrator = await AdministratorService.createAdministrator({
        username: name,
        email,
        password,
      });

      return administrator;
    },
    async login(_, args) {
      const { email, password } = args;

      const { valid, errors } = validateLogin(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const administrator = await AdministratorService.findOneAdministrator({ email, password });

      if (!administrator) {
        throw new UserInputError('Incorrect email/password');
      }

      return administrator;
    },
  },
};
