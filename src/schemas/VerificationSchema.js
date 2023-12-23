const { model, Schema } = require('mongoose');

module.exports = model(
  'VerificationSchema',
  new Schema({
    guild: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
    },
  })
);
