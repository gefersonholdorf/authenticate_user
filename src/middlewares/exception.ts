import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"

export function errorHandler(error: Error,request : Request, response : Response, next : NextFunction) {

    if (error instanceof ZodError) {
        response.status(400).json({
            status: "Error",
            message: error.issues[0].message
        })
    }

    response.status(400).json({
        status: "Error",
        message: error.message
    })
}