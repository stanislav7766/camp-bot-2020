import deps from '../../dependencies'
import { GROUPS, TEAMS, ALL_CAMP_AUDIENCE } from '../../constants'

const { mongoose } = deps
const { Schema, models, model } = mongoose

const notificationSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  msg: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
    enum: [...GROUPS, ...TEAMS, ALL_CAMP_AUDIENCE],
  },
})
export default models.notifications || model('notifications', notificationSchema)
