import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { UseCase } from "../../usecase";
const bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken"

export interface AuthenticateInputDto {
    email : string
    password : string
}

export interface AuthenticateOutputDto {
    token : string
}

export class AuthenticateService implements UseCase<AuthenticateInputDto, AuthenticateOutputDto> {

    private constructor(private readonly userRepository : UserRepository) {}

    public static build(userRepository : UserRepository) {
        return new AuthenticateService(userRepository)
    }

    async execute(input: AuthenticateInputDto): Promise<AuthenticateOutputDto> {

        const user = await this.userRepository.findByEmail(input.email)

        if (!user) {
            throw new Error("Credenciais inválidas!")
        }

        const passwordCompare = await bcrypt.compare(input.password, user.password)
        console.log(passwordCompare)

        if (!passwordCompare) {
            throw new Error("Credenciais inválidas!")
        }

        const token = jwt.sign(
            {
                name: user.name,
                userId: user.id
            }, 
            process.env.SECRET_KEY || "SECRETKEY",  
            {
                expiresIn: '12h',
            }
        )

        return {token}
    }

}