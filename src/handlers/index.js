import services from '../services'
import AuthorizeHandler from './authorize.handler'
import MeetupHandler from './meetup.handler'
import UserHandler from './user.handler'

const { authorizeService, userService, meetupService } = services

const authorizeHandler = AuthorizeHandler(authorizeService)
const userHandler = UserHandler(userService)
const meetupHandler = MeetupHandler(meetupService)
export default { authorizeHandler, userHandler, meetupHandler }
