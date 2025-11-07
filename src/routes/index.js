import express from 'express'
import authRoutes from './auth.routes.js'
import clientesRoutes from './clientes.routes.js'
import servicosRoutes from './servicos.routes.js'
import financeiroRoutes from './financeiro.routes.js'
import produtosRoutes from './produtos.routes.js'

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/clientes', clientesRoutes)
router.use('/servicos', servicosRoutes)
router.use('/financeiro', financeiroRoutes)
router.use('/produtos', produtosRoutes)

export default router
