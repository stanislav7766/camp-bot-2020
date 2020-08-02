import deps from '../../dependencies'

const { mongoose } = deps
const { Schema, models, model } = mongoose

const contextSchema = new Schema({
  nickname: { type: String },
  status: {
    type: String,
  },
  command: {
    type: String,
  },
  keyboard: {
    type: String,
  },
  papyrus: {
    type: String,
  },
  typedPoints: {
    type: String,
  },
  notifyProp: {
    type: String,
  },
  msgFile: {
    receiverMsg: { type: String },
    msg: { type: String },
    file: { type: String },
  },
  notify: {
    date: { type: String },
    day: { type: String },
    time: { type: String },
    audience: { type: String },
    msg: { type: String },
  },
})
export default models.contexts || model('contexts', contextSchema)
