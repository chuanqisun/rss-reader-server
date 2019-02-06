const Sequelize = require('sequelize');
const {connection} = require('../connection');

const Activity = connection.define('activity', {
  subscriptionId: { type: Sequelize.INTEGER },
  type: { type: Sequelize.ENUM, values: ['read'] },
});

// !! DANGER !!
// const ActivitySynced = Activity.sync({force: true});

const ActivitySynced = Activity.sync();

async function addActivity({subscriptionId, type}) {
  const Activity = await ActivitySynced;
  return await Activity.create({subscriptionId, type});
}

async function getActivities() {
  const Activity = await ActivitySynced;
  return await Activity.findAll();
}

async function removeActivity({id}) {
  const Activity = await ActivitySynced;
  return await Activity.destroy({where: {id}});
}

module.exports = {
  addActivity,
  getActivities,
  removeActivity,
}