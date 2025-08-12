/* eslint-disable indent */
import Product from '~/models/product.model'
import Version from '~/models/version.model'
import versionService from '~/services/version.service'
import { versionValid } from '~/validation/version.validation'

// @desc    Lấy tất cả phiên bản
// @route   GET /api/versions
// @access  Public
const getAllVersions = async (req, res, next) => {
  try {
    const { page, limit, sort, order, keyword, price_min, price_max, ram, memory, screen, cpu, vga } = req.query
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      populate: {
        path: 'product',
        select: 'name images subcategory',
        populate: {
          path: 'subcategory',
          select: 'name category'
        }
      },
      sort: versionService.getSortOptions(sort, order)
    }

    const filter = {}
    // Lấy danh sách ID sản phẩm dựa trên từ khóa tìm kiếm
    if (keyword) {
      const productIds = await versionService.getProductIds(keyword)
      if (productIds.length > 0) {
        filter['product'] = { $in: productIds }
      } else if (productIds.length === 0) {
        return res.status(200).json({
          message: 'Không tìm thấy sản phẩm nào!',
          data: []
        })
      }
    }

    // Áp dụng bộ lọc giá
    versionService.applyPriceRangeFilter(filter, price_min, price_max)
    // Áp dụng bộ lọc regex theo cấu hình
    versionService.applyRegexFilters(filter, ram, memory, screen, cpu, vga)

    // Loại bỏ các sản phẩm có category là "Linh kiện"
    const productIdsToExclude = await versionService.excludeProductsByCategoryName('Linh kiện')
    if (productIdsToExclude.length > 0) {
      filter['product'] = { ...filter['product'], $nin: productIdsToExclude }
    }

    const versions = await Version.paginate(filter, options)
    if (versions.totalDocs === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công!',
      data: versions
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy tất cả phụ kiện
// @route   GET /api/versions/accessory
// @access  Public
const getAllAccessories = async (req, res, next) => {
  try {
    const { page, limit, sort, order, keyword, price_min, price_max, ram } = req.query
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      populate: {
        path: 'product',
        select: 'name images subcategory',
        populate: {
          path: 'subcategory',
          select: 'name category'
        }
      },
      sort: versionService.getSortOptions(sort, order)
    }

    const filter = {}
    // Lấy danh sách ID sản phẩm dựa trên từ khóa tìm kiếm
    if (keyword) {
      const productIds = await versionService.getProductIds(keyword)
      if (productIds.length > 0) {
        filter['product'] = { $in: productIds }
      } else if (productIds.length === 0) {
        return res.status(200).json({
          message: 'Không tìm thấy sản phẩm nào!',
          data: []
        })
      }
    }

    // Áp dụng bộ lọc giá
    versionService.applyPriceRangeFilter(filter, price_min, price_max)
    // Áp dụng bộ lọc regex theo cấu hình
    versionService.applyRegexFilters(filter, ram)

    // Loại bỏ các sản phẩm có category là "Linh kiện"
    const productIdsToExclude = await versionService.excludeProductsByCategoryName('Linh kiện')
    if (productIdsToExclude.length > 0) {
      filter['product'] = { ...filter['product'], $in: productIdsToExclude }
    }

    const versions = await Version.paginate(filter, options)
    if (versions.totalDocs === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công!',
      data: versions
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy tất cả phiên bản nổi bật
// @route   GET /api/versions/featured
// @access  Public
const getAllFeaturedVersions = async (req, res, next) => {
  try {
    const versions = await Version.find({ is_featured: true }).populate({
      path: 'product',
      select: 'name images subcategory',
      populate: {
        path: 'subcategory',
        select: 'name category'
      }
    })

    if (versions.length === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm nổi bật thành công!',
      data: versions
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy tất cả phiên bản theo danh mục
// @route   GET /api/versions/category/:category
// @access  Public
const getAllVersionsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const { page, limit, sort, order, price_min, price_max, ram, memory, screen, cpu, vga } = req.query
    const versions = await Version.find().populate({
      path: 'product',
      populate: {
        path: 'subcategory',
        match: { category }
      }
    })
    const filteredVersions = versions.filter((version) => version.product && version.product.subcategory)

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      populate: {
        path: 'product',
        select: 'name images subcategory',
        populate: {
          path: 'subcategory',
          select: 'name category'
        }
      },
      sort: versionService.getSortOptions(sort, order)
    }

    const filter = {}
    // Áp dụng bộ lọc giá
    versionService.applyPriceRangeFilter(filter, price_min, price_max)
    // Áp dụng bộ lọc regex theo cấu hình
    versionService.applyRegexFilters(filter, ram, memory, screen, cpu, vga)

    const versionsByCategory = await Version.paginate(
      { product: { $in: filteredVersions.map((version) => version.product._id) }, ...filter },
      options
    )
    if (versionsByCategory.totalDocs === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công!',
      data: versionsByCategory
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy tất cả phiên bản theo danh mục con
// @route   GET /api/versions/subcategory/:subcategory
// @access  Public
const getAllVersionsBySubcategory = async (req, res, next) => {
  try {
    const { subcategory } = req.params
    const { page, limit, sort, order, price_min, price_max, ram, memory, screen, cpu, vga } = req.query
    const versions = await Version.find().populate({
      path: 'product',
      match: { subcategory }
    })
    const filteredVersions = versions.filter((version) => version.product && version.product.subcategory)

    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      populate: {
        path: 'product',
        select: 'name images subcategory',
        populate: {
          path: 'subcategory',
          select: 'name category'
        }
      },
      sort: versionService.getSortOptions(sort, order)
    }

    const filter = {}
    // Áp dụng bộ lọc giá
    versionService.applyPriceRangeFilter(filter, price_min, price_max)
    // Áp dụng bộ lọc regex theo cấu hình
    versionService.applyRegexFilters(filter, ram, memory, screen, cpu, vga)

    const versionsBySubcategory = await Version.paginate(
      { product: { $in: filteredVersions.map((version) => version.product._id) }, ...filter },
      options
    )
    if (versionsBySubcategory.totalDocs === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công!',
      data: versionsBySubcategory
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy phiên bản theo ID
// @route   GET /api/versions/:id
// @access  Public
const getVersionById = async (req, res, next) => {
  try {
    const version = await Version.findById(req.params.id).populate({
      path: 'product',
      select: 'name images subcategory',
      populate: {
        path: 'subcategory',
        select: 'name category'
      }
    })
    if (!version) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này!' })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm thành công!',
      data: version
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Tạo mới phiên bản
// @route   POST /api/versions
// @access  Private (admin, staff)
const createVersion = async (req, res, next) => {
  try {
    // Chuẩn hóa tên sản phẩm trước khi kiểm tra
    const normalizedVersionName = req.body.name.toLowerCase()
    // Kiểm tra sự tồn tại của sản phẩm (bao gồm cả viết hoa và viết thường)
    const existedVersion = await Version.findOne({
      name: { $regex: new RegExp('^' + normalizedVersionName + '$', 'i') }
    })
    if (existedVersion) {
      return res.status(400).json({ message: 'Sản phẩm này đã tồn tại!' })
    }

    const { error } = versionValid.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map((item) => item.message)
      return res.status(400).json({ errors })
    }

    const version = await Version.create(req.body)
    if (!version) {
      return res.status(400).json({ message: 'Tạo sản phẩm không thành công!' })
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      version.product,
      { $addToSet: { versions: version._id } },
      { new: true }
    )
    if (!updatedProduct) {
      return res.status(400).json({ message: 'Cập nhật sản phẩm không thành công!' })
    }

    return res.status(201).json({
      message: 'Tạo sản phẩm thành công!',
      data: version
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Cập nhật phiên bản
// @route   PUT /api/versions/:id
// @access  Private (admin, staff)
const updateVersion = async (req, res, next) => {
  try {
    const { error } = versionValid.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map((item) => item.message)
      return res.status(400).json({ errors })
    }

    // Chuẩn hóa tên sản phẩm trước khi kiểm tra
    const normalizedVersionName = req.body.name.toLowerCase()
    // Kiểm tra sự tồn tại của sản phẩm (bao gồm cả viết hoa và viết thường)
    const existedVersion = await Version.findOne({
      name: { $regex: new RegExp('^' + normalizedVersionName + '$', 'i') }
    })
    if (existedVersion && existedVersion._id != req.params.id) {
      return res.status(400).json({ message: 'Sản phẩm này đã tồn tại!' })
    }

    const version = await Version.findById(req.params.id)
    if (!version) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này!' })
    }

    if (req.body.product !== version.product) {
      const oldProduct = await Product.findByIdAndUpdate(version.product, { $pull: { versions: version._id } })
      if (!oldProduct) {
        return res.status(400).json({ message: 'Cập nhật sản phẩm không thành công!' })
      }

      const newProduct = await Product.findByIdAndUpdate(req.body.product, { $push: { versions: version._id } })
      if (!newProduct) {
        return res.status(400).json({ message: 'Cập nhật sản phẩm không thành công!' })
      }
    }

    const updatedVersion = await Version.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedVersion) {
      return res.status(400).json({ message: 'Cập nhật sản phẩm không thành công!' })
    }

    return res.status(200).json({
      message: 'Cập nhật sản phẩm thành công!',
      data: updatedVersion
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Xóa mềm phiên bản
// @route   DELETE /api/versions/soft-delete/:id
// @access  Private (admin, staff)
const softDeleteVersion = async (req, res, next) => {
  try {
    const version = await Version.findById(req.params.id)
    if (!version) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này!' })
    }

    await Version.delete({ _id: req.params.id })
    return res.status(200).json({ message: 'Xóa sản phẩm thành công!' })
  } catch (error) {
    next(error)
  }
}

// @desc    Lấy danh sách phiên bản đã xóa mềm
// @route   GET /api/versions/trash-versions
// @access  Private (admin, staff)
const getListDeletedVersions = async (req, res, next) => {
  try {
    const { sort, order, keyword, price_min, price_max, ram, memory, screen, cpu, vga } = req.query
    const options = {
      pagination: false,
      populate: {
        path: 'product',
        select: 'name images subcategory',
        populate: {
          path: 'subcategory',
          select: 'name category'
        }
      },
      sort: versionService.getSortOptions(sort, order),
      customFind: 'findWithDeleted'
    }

    const filter = { deleted: true }
    // Lấy danh sách ID sản phẩm dựa trên từ khóa tìm kiếm
    if (keyword) {
      const productIds = await versionService.getProductIds(keyword)
      if (productIds.length > 0) {
        filter['product'] = { $in: productIds }
      } else if (productIds.length === 0) {
        return res.status(200).json({
          message: 'Không tìm thấy sản phẩm nào!',
          data: []
        })
      }
    }

    // Áp dụng bộ lọc giá
    versionService.applyPriceRangeFilter(filter, price_min, price_max)
    // Áp dụng bộ lọc regex theo cấu hình
    versionService.applyRegexFilters(filter, ram, memory, screen, cpu, vga)

    // Tìm các phiên bản đã bị xóa với điều kiện và populate
    const versions = await Version.paginate(filter, options)
    if (versions.totalDocs === 0) {
      return res.status(200).json({
        message: 'Không tìm thấy sản phẩm nào!',
        data: []
      })
    }

    return res.status(200).json({
      message: 'Lấy sản phẩm đã xóa thành công!',
      data: versions
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Khôi phục phiên bản đã xóa mềm
// @route   PATCH /api/versions/restore-deleted/:id
// @access  Private (admin, staff)
const restoreDeletedVersion = async (req, res, next) => {
  try {
    const version = await Version.findOneDeleted({ _id: req.params.id })
    if (!version) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này!' })
    }

    await Version.restore({ _id: req.params.id })
    return res.status(200).json({ message: 'Khôi phục sản phẩm thành công!' })
  } catch (error) {
    next(error)
  }
}

// @desc    Xóa vĩnh viễn phiên bản
// @route   DELETE /api/versions/:id
// @access  Private (admin, staff)
const deleteVersion = async (req, res, next) => {
  try {
    const version = await Version.findOneDeleted({ _id: req.params.id })
    if (!version) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm này!' })
    }

    await Version.deleteOne({ _id: req.params.id })

    const updatedProduct = await Product.findByIdAndUpdate(version.product, { $pull: { versions: version._id } })
    if (!updatedProduct) {
      return res.status(400).json({ message: 'Cập nhật sản phẩm không thành công!' })
    }

    return res.status(200).json({ message: 'Xóa sản phẩm thành công!' })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllVersions,
  getAllAccessories,
  getAllFeaturedVersions,
  getAllVersionsByCategory,
  getAllVersionsBySubcategory,
  getVersionById,
  createVersion,
  updateVersion,
  softDeleteVersion,
  getListDeletedVersions,
  restoreDeletedVersion,
  deleteVersion
}
