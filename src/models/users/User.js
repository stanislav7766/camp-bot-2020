import deps from '../../dependencies'
import { GROUPS, TEAMS, STATUS } from '../../constants'

const { mongoose } = deps
const { Schema, models, model } = mongoose

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: STATUS,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  group: {
    type: String,
    required: false,
    enum: GROUPS,
  },
  team: {
    type: String,
    required: true,
    enum: TEAMS,
  },
  numberList: {
    type: Number,
    required: false,
  },
  chatID: {
    type: Number,
    required: false,
  },
})
export default models.users || model('users', userSchema)
