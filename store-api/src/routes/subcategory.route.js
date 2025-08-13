import { Router } from 'express'
import subcategoryController from '~/controllers/subcategory.controller'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'
import { checkPermission } from '~/middlewares/checkPermission'

const routerSubcategory = Router()
routerSubcategory.use(cacheMiddleware('subcategories', 60))

routerSubcategory.get('/', subcategoryController.getAllSubcategories)
routerSubcategory.get('/:id', subcategoryController.getSubcategoryById)
routerSubcategory.post('/', checkPermission('admin', 'staff'), subcategoryController.createSubcategory)
routerSubcategory.put('/:id', checkPermission('admin', 'staff'), subcategoryController.updateSubcategory)
routerSubcategory.delete('/:id', checkPermission('admin', 'staff'), subcategoryController.deleteSubcategory)

export default routerSubcategory
