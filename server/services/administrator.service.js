const Administrator = require('../schema/administrator');


const Create = async (data) => {
  try {
    const administrator = await Administrator.create(data);
    return administrator;
  } catch (error) {
    throw Error(error);
  }
};

const Find = async (query) => {
  try {
    const administrators = await Administrator.find(query);
    return administrators;
  } catch (error) {
    throw Error(error);
  }
};

const FindOne = async (query) => {
  try {
    const administrator = await Administrator.findOne(query);
    return administrator;
  } catch (error) {
    throw Error(error);
  }
};

const FindOneAndUpdate = async (filter, data, options = {}) => {
  try {
    const administrator = await Administrator.findOneAndUpdate(filter, {
      ...data,
      updatedAt: new Date(),
    }, {
      new: true,
      ...options,
    });
    return administrator;
  } catch (error) {
    throw Error(error);
  }
};

const DeleteOne = async (filter) => {
  try {
    const deletedAdministrator = await Administrator.deleteOne(filter);
    return deletedAdministrator;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  Create,
  Find,
  FindOne,
  FindOneAndUpdate,
  DeleteOne,
};
