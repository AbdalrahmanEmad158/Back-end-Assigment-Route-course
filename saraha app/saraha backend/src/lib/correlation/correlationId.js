import crypto from "node:crypto"
export default function CorrelationId(req,res,next){
    const correlationId = crypto.randomUUID()
    req.correlationId = correlationId
    res.setHeader("X-Correlation-ID",correlationId)
    next()
} 