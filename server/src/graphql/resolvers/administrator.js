const { ApolloError, AuthenticationError, UserInputError } = require('apollo-server');
const Joi = require('@hapi/joi');

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

      try {
        const schema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().regex(/^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*\W.*\W)[a-zA-Z0-9\S]{20,}$/).required(),
        });
        const input = {
          email,
          password,
        };
        await schema.validateAsync(input);
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: Object.keys(args) });
      }

      // problem with using joi validation is that I cannot make an array of errors.
      // todo: create custom validation??

      const admin = await AdministratorService.findOneAdministrator({ email });

      if (admin) {
        throw new UserInputError('Email already exist', { invalidArgs: Object.keys(args) });
      }

      const administrator = await AdministratorService.createAdministrator({ username: name, email, password });

      return administrator;
    },
  },
};
