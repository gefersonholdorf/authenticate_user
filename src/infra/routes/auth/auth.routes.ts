import { Router } from "express";
import { UserRepository } from "../../repositories/user/user.repository";
import { prismaClient } from "../../../prisma/client";
import { AuthenticateService } from "../../../usecases/services/auth/authenticate.service";
import { AuthenticateController } from "../../controllers/auth/authenticate.controller";

export const authRoutes = Router()

const userRepository = UserRepository.build(prismaClient)

const authenticateService = AuthenticateService.build(userRepository)

const authenticateController = AuthenticateController.build(authenticateService)

authRoutes.post('/login', (request, response, next) => authenticateController.handle(request, response, next))