import AuthorizeService from './authorize.service'
import UserService from './user.service'
import MeetupService from './meetup.service'
import NotificationService from './notification.service'
import models from '../models'

const { userModel, meetupModel, notificationModel } = models
const authorizeService = AuthorizeService(userModel)
const userService = UserService(userModel)
const meetupService = MeetupService({ meetupModel, notificationModel })
const notificationService = NotificationService({ meetupModel, notificationModel, userModel })

export default { authorizeService, userService, meetupService, notificationService }
