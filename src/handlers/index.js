import services from '../services'
import AuthorizeHandler from './authorize'

const { authorizeService } = services

const authorizeHandler = AuthorizeHandler(authorizeService)
export default { authorizeHandler }
