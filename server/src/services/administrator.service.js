const AdministratorDb = require('../db/administrator.db');

const countAdministrators = async (query) => {
  const adminCount = await AdministratorDb.count(query);
  return adminCount;
};

const createAdministrator = async (data) => {
  const administrator = await AdministratorDb.create(data);
  return administrator;
};

const deleteAdministrator = async (filter) => {
  const deletedAdministrator = await AdministratorDb.deleteOne(filter);
  return deletedAdministrator;
};

const findOneAdministrator = async (query) => {
  const administrator = await AdministratorDb.findOne(query);
  return administrator;
};

const listsOfAdministrator = async () => {
  const administrators = await AdministratorDb.find({});
  return administrators;
};

const updateAdministrator = async (filter, data) => {
  const administrator = await AdministratorDb.findOneAndUpdate(filter, data);
  return administrator;
};

module.exports = {
  countAdministrators,
  createAdministrator,
  deleteAdministrator,
  findOneAdministrator,
  listsOfAdministrator,
  updateAdministrator,
};
