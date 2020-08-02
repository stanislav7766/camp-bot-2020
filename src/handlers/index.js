import services from '../services'
import AuthorizeHandler from './authorize.handler'
import MeetupHandler from './meetup.handler'
import UserHandler from './user.handler'
import NotificationHandler from './notification.handler'

const { authorizeService, userService, meetupService, notificationService } = services

const authorizeHandler = AuthorizeHandler(authorizeService)
const userHandler = UserHandler(userService)
const meetupHandler = MeetupHandler(meetupService)
const notificationHandler = NotificationHandler(notificationService)
export default { authorizeHandler, userHandler, meetupHandler, notificationHandler }
