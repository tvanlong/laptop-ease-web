import { Router } from 'express'
import { getChatHistoryController, searchAndSuggestController } from '~/controllers/ai.controller'
import { checkPermission } from '~/middlewares/checkPermission'

const router = Router()

router.get('/', checkPermission('member'), searchAndSuggestController)
router.get('/history', checkPermission('member'), getChatHistoryController)

export default router
