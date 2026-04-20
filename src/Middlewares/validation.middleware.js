import { BadRequestException } from "../Common/index.js";
const validation = (schema) => {
    return (req, res, next) => {
        const validationErrors =[]
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], {abortEarly:false}) 
            if (error) {
                validationErrors.push(error.details.map((err) => err)
                    
                )
                
            }
            
        }

        if (validationErrors.length) {
            throw new BadRequestException('validation error', {validationErrors: validationErrors.flat()})
        }
        next()
    }
}

export default validation