import AuthorizeService from './authorize'
import UserService from './user'
import models from '../models'

const { userModel } = models
const authorizeService = AuthorizeService(userModel)
const userService = UserService(userModel)

export default { authorizeService, userService }
