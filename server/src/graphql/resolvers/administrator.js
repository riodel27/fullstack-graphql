const { UserInputError } = require('apollo-server');

const { decryptSession, sessionize } = require('../../util/helper');
const { validateCreateAdministrator, validateLogin } = require('../../util/validators');
const AdministratorService = require('../../services/administrator.service');


module.exports = {
  Query: {
    async administrators(_, __, ctx) {
      // decrypt session only when there is session user in ctx request.
      const administrator = decryptSession(ctx.req.session.user);
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
    async login(_, args, ctx) {
      const { email, password } = args;

      const { valid, errors } = validateLogin(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const administrator = await AdministratorService.findOneAdministrator({ email, password });

      if (!administrator) {
        throw new UserInputError('Incorrect email/password');
      }

      ctx.req.session.user = sessionize(administrator);

      return administrator;
    },
  },
};
