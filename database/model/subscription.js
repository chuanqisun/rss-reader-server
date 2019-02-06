const Sequelize = require('sequelize');
const {connection} = require('../connection');

const SubscriptionModel = connection.define('subscription', {
  title: { type: Sequelize.STRING },
  url: { type: Sequelize.STRING },
});

// !! DANGER !!
// const SubscriptionModelSynced = SubscriptionModel.sync({force: true});

const SubscriptionModelSynced = SubscriptionModel.sync();

async function addSubscription({title, url}) {
  const Subscription = await SubscriptionModelSynced;
  return await Subscription.create({title, url});
}

async function getSubscriptions() {
  const Subscription = await SubscriptionModelSynced;
  return await Subscription.findAll();
}

async function removeSubscription({id}) {
  const Subscription = await SubscriptionModelSynced;
  return await Subscription.destroy({where: {id}});
}

module.exports = {
  addSubscription,
  getSubscriptions,
  removeSubscription,
}
