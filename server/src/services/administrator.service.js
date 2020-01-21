const AdministratorDb = require('../db/administrator.db');


const createAdministrator = async (data) => {
  const administrator = await AdministratorDb.create(data);
  return administrator;
};

const listsOfAdministrator = async () => {
  const administrators = await AdministratorDb.find({});
  return administrators;
};

const findOneAdministrator = async (query) => {
  const administrator = await AdministratorDb.findOne(query);
  return administrator;
};

const updateAdministrator = async (filter, data) => {
  const administrator = await AdministratorDb.findOneAndUpdate(filter, data);
  return administrator;
};

module.exports = {
  createAdministrator,
  listsOfAdministrator,
  findOneAdministrator,
  updateAdministrator,
};
