import { NextFunction, Request, Response } from "express";
import { AuthenticateInputDto, AuthenticateService } from "../../../usecases/services/auth/authenticate.service";
import { AuthenticateUserSchema } from "../../../validations/authenticate-user.schema";

export class AuthenticateController {

    private constructor(private readonly authenticateService : AuthenticateService){}

    public static build(authenticateService : AuthenticateService) {
        return new AuthenticateController(authenticateService)
    }

    async handle(request : Request, response : Response, next : NextFunction) : Promise<void> {

        const {email, password} = request.body

        const login : AuthenticateInputDto = {
            email, password
        }

        try {
            AuthenticateUserSchema.parse(login)
        } catch (error) {
            next(error)
        }

        try {
            
            const token = await this.authenticateService.execute(login)
            
            response.status(200).json(token)

        } catch (error) {
            next(error)
        }
    }
}