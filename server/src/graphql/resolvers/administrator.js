/* eslint-disable no-underscore-dangle */
const {
  UserInputError, AuthenticationError, ApolloError, ForbiddenError,
} = require('apollo-server');

const {
  sessionize, isValidMongoId, formatMutationInput, decryptSession,
} = require('../../util/helper');
const { validateCreateAdministrator, validateLogin, validateUpdateAdministrator } = require('../../util/validators');
const AdministratorService = require('../../services/administrator.service');


module.exports = {
  Query: {
    async administrator(_, args, ctx) {
      if (!ctx.req.session.user) throw new AuthenticationError('you must be logged in');

      const { id } = args;

      const userSession = decryptSession(ctx.req.session.user);

      const adminUserSession = await AdministratorService.findOneAdministrator({ _id: userSession._id });

      if (!adminUserSession) throw new ForbiddenError('Restricted to administrator user only');

      try {
        isValidMongoId(id);
      } catch (error) {
        throw new ApolloError(error.message, 500);
      }

      const administrator = await AdministratorService.findOneAdministrator({ _id: id });

      if (!administrator) throw new ApolloError('Unknown administrator', 404);

      return administrator;
    },
    async administrators(_, __, ctx) {
      if (!ctx.req.session.user) throw new AuthenticationError('you must be logged in');

      const administrators = await AdministratorService.listsOfAdministrator();
      return administrators;
    },
  },
  Mutation: {
    async createAdministrator(_, args, ctx) {
      if (!ctx.req.session.user) throw new AuthenticationError('you must be logged in');

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
    async deleteAdministrator(_, args, ctx) {
      if (!ctx.req.session.user) throw new AuthenticationError('you must be logged in');

      const { id } = args;

      try {
        isValidMongoId(id);
      } catch (error) {
        throw new ApolloError(error.message, 500);
      }

      const administrator = await AdministratorService.findOneAdministrator({ _id: id });

      if (!administrator) throw new ApolloError('Unknown administrator', 404);

      const adminCounts = await AdministratorService.countAdministrators({});

      if (adminCounts === 1) throw new UserInputError('Atleast one administrator should be active', 403);

      await AdministratorService.deleteAdministrator({ _id: id });

      return 'entry deleted';
    },
    async login(_, args, ctx) {
      const { email, password } = args;

      const { valid, errors } = validateLogin(email, password);

      if (!valid) throw new UserInputError('Errors', { errors });

      const administrator = await AdministratorService.findOneAdministrator({ email, password });

      if (!administrator) throw new UserInputError('Incorrect email/password');


      ctx.req.session.user = sessionize(administrator);

      return administrator;
    },
    async updateAdministrator(_, args, ctx) {
      if (!ctx.req.session.user) throw new AuthenticationError('you must be logged in');

      const { id, patch } = args;

      try {
        isValidMongoId(id);
      } catch (error) {
        throw new ApolloError(error.message, 500);
      }

      const administrator = await AdministratorService.findOneAdministrator({ _id: id });

      if (!administrator) {
        throw new ApolloError('Unknown administrator', 404);
      }

      const { valid, errors } = await validateUpdateAdministrator(id, patch);

      if (!valid) throw new UserInputError('Errors', { errors });

      const administratorInputData = formatMutationInput({
        email: patch.email,
        password: patch.password,
        username: patch.username,
      });

      const updatedAdministrator = await AdministratorService.updateAdministrator({ _id: id }, administratorInputData);

      return updatedAdministrator;
    },
  },
};
