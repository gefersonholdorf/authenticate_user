import { NextFunction, Request, Response } from "express";
import { CreateUserInputDto, CreateUserService } from "../../../usecases/services/user/create-user.service";
import { CreateUserSchema } from "../../../validations/create-user.schema";
import { ZodError } from "zod";

export class CreateUserController {
    private constructor(private readonly createUserService : CreateUserService) {}

    public static build(createUserService : CreateUserService){
        return new CreateUserController(createUserService)
    }

    async handle(request : Request, response : Response, next : NextFunction) : Promise<any> {
        const {name, email, password} = request.body

        try {
            CreateUserSchema.parse(request.body)
        } catch (error) {
            next(error)
        }

        const createUser : CreateUserInputDto = {
            name, email, password
        }

        try {
            await this.createUserService.execute(createUser)
            
            response.status(201).json('Usuário cadastrado com sucesso!')
        } catch (error) {
            console.log(error)
            next(error)
        }

    }
}