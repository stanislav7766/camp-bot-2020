import services from '../services'
import AuthorizeHandler from './authorize'
import UserHandler from './user'
const { authorizeService, userService } = services

const authorizeHandler = AuthorizeHandler(authorizeService)
const userHandler = UserHandler(userService)
export default { authorizeHandler, userHandler }
