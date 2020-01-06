const { UserInputError } = require('apollo-server');

const { validateCreateAdministrator, validateLogin } = require('../../util/validators');
const AdministratorService = require('../../services/administrator.service');


module.exports = {
  Query: {
    async administrators(_, __, ctx) {
      // TODO: expect user session is hashed. ctx.req.sesson.user
      // TODO: manage of session timeout? through redis or cookie browser?
      // TODO: how to check the session in redis running in docker?

      console.log('session: ', ctx.req.session);
      console.log('session user: ', ctx.req.session.user);
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

      // TODO: hash user and store to session.
      ctx.req.session.user = email;

      return administrator;
    },
  },
};
