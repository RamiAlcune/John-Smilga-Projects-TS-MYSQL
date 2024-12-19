import express, { Request, Response } from 'express'

import products, { Iproducts } from '../models/products'
import asyncWrapper from '../middleware/async'
import router from '../routes/productsRoutes'
import { match } from 'assert'

interface queryObject {
  featured?: boolean
  company?: string
  name?: string | { $regex: string; $options: string }
  feilds?: string
}
export const getAllProducts = asyncWrapper(
  async (req: Request, res: Response) => {
    let SortingOptions: string = ''
    const { featured, company, search, name, fields, sort, numericFilter } =
      req.query

    const optionList: queryObject = {}
    if (name) optionList.name = name as string
    if (featured) optionList.featured = featured === 'true' ? true : false
    if (company) optionList.company = company as string
    if (search) optionList.name = { $regex: search as string, $options: 'i' }

    let query = products.find(optionList)

    if (sort) {
      SortingOptions = (sort as string).split(',').join(' ')
    }
    if (SortingOptions) {
      query.sort(SortingOptions)
    }

    if (fields) {
      const selectedFields: string = (fields as string).split(',').join(' ')
      query.select(selectedFields)
    }

    if (numericFilter) {
      const operatorMap: { [key: string]: string } = {
        '>': '$gt',
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte',
        '=': '$eq',
      }
      const regex = /\b(>|>=|<|<=|=)\b/g
      const filters: any = {}

      ;(numericFilter as string).split(',').forEach((item) => {
        const [field, operator, value] = item.split(regex)
        if (field && operator && value) {
          filters[field] = { [operatorMap[operator]]: Number(value) }
        }
      })

      query = query.find(filters)
    }

    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit) || 10
    const skip: number = (page - 1) * limit
    query = query.skip(skip).limit(limit)

    const product = await query

    res.status(200).json({ ProductsCount: product.length, product })
  }
)

export const createNewProduct = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const product: Iproducts = await products.create(req.body)
    res.status(201).json({ product })
  }
)

export default router
