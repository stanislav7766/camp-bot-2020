import AuthorizeService from './authorize'
import models from '../models'
const { userModel } = models
const authorizeService = AuthorizeService(userModel)
export default { authorizeService }
