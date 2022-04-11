/**
 * The routes.
 *
 * @author Ellinor Henriksson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as authRouter } from './api/v1/auth-router.js'

export const router = express.Router()

router.use('/auth', authRouter)

router.use('*', (req, res, next) => next(createError(404)))
