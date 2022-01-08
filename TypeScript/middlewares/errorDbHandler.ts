import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = { ...err }

  error.message = err.message

  // Log to console for dev
  console.log(err)

  if (err.name === 'SequelizeValidationError') {
    const errObj: any = {}
    err.errors.map((er: any) => {
      errObj[er.path] = er.message
    })
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: 'fail',
      errMsg: errObj,
    })
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errObj: any = {}
    err.errors.map((er: any) => {
      errObj[er.path] = er.message
    })
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: 'fail',
      errMsg: errObj,
    })
  }

  if (err.name === 'TypeError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: 'fail',
      errMsg: err.message,
    })
  }

  if ('NotFoundError') {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: 'fail',
      errMsg: err.message,
    })
  }
  if ('BadRequestError') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: 'fail',
      errMsg: err.message,
    })
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: 'fail',
    errMsg: 'Server error, please contact site admin',
  })
}

export default errorHandler
