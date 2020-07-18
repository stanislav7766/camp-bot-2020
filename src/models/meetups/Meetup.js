import deps from '../../dependencies'
import { GROUPS, TEAMS, ALL_CAMP_AUDIENCE } from '../../constants'

const { mongoose } = deps
const { Schema, models, model } = mongoose

const meetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    required: true,
    enum: [...GROUPS, TEAMS, ALL_CAMP_AUDIENCE],
  },
  facilitator: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  ],
  link: {
    type: String,
    required: false,
  },
})
export default models.meetups || model('meetups', meetupSchema)
