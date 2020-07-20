import AuthorizeService from './authorize.service'
import UserService from './user.service'
import MeetupService from './meetup.service'
import models from '../models'

const { userModel, meetupModel } = models
const authorizeService = AuthorizeService(userModel)
const userService = UserService(userModel)
const meetupService = MeetupService(meetupModel)

export default { authorizeService, userService, meetupService }
