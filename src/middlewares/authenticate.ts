import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuthenticate(request : Request, response : Response, next : NextFunction) {
    const bearer = request.headers.authorization

    if (!bearer) {
        response.status(401).json({
            message: "Acesso não autorizado!"
        })
        return
    }

    const [, token] = bearer.split(" ")

    try {
        verify(token, process.env.SECRET_KEY || "SECRETKEY")
        return next()

    } catch (error) {
        response.status(401).json({
            message: "Token inválido!"
        })
        return
    }
}