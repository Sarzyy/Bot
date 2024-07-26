const { Schema, model } = require('mongoose')

const autoRoleSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
  }
})

module.exports = model('WelcomeChannel', autoRoleSchema);