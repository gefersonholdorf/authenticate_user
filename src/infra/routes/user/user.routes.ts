import { NextFunction, Request, Response, Router } from "express";
import { UserRepository } from "../../repositories/user/user.repository";
import { prismaClient } from "../../../prisma/client";
import { CreateUserService } from "../../../usecases/services/user/create-user.service";
import { CreateUserController } from "../../controllers/user/create-user.controller";

export const userRoutes = Router()

const userRepository = UserRepository.build(prismaClient)

const createUserService = CreateUserService.build(userRepository)

const createUserController = CreateUserController.build(createUserService)

userRoutes.post('/create-user', (request : Request, response : Response, next : NextFunction) => createUserController.handle(request, response, next))
