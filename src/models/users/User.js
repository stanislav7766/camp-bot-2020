import deps from '../../dependencies'
import { GROUPS, TEAMS } from '../../constants'

const { mongoose } = deps
const { Schema, models, model } = mongoose

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: false,
    default: 0,
  },
  group: {
    type: String,
    required: true,
    enum: GROUPS,
  },
  team: {
    type: String,
    required: true,
    enum: TEAMS,
  },
})
export default models.users || model('users', userSchema)
