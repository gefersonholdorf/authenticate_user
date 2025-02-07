import { UserEntity } from "../../../domains/user/entities/user.entity"
import { UserRepository } from "../../../infra/repositories/user/user.repository"
import { UseCase } from "../../usecase"
import bcrypt from "bcrypt"

export interface CreateUserInputDto {
    id ?: number
    name : string
    email : string
    password : string
    createdAt ?: Date
}

export class CreateUserService implements UseCase<CreateUserInputDto, void> {

    private constructor (private readonly userRepository : UserRepository) {}

    public static build(userRepository : UserRepository) {
        return new CreateUserService(userRepository)
    }

    async execute(input: CreateUserInputDto): Promise<void> {

        const passwordHash = await bcrypt.hash(input.password, 10)

        const verifyUser = await this.userRepository.findByEmail(input.email)

        if (verifyUser) {
            throw new Error('E-mail já cadastrado no sistema')
        }

        const newUser : UserEntity = UserEntity.build({
            id: input.id,
            name: input.name,
            email: input.email,
            password: passwordHash,
            createdAt: input.createdAt
        })

        await this.userRepository.create(newUser)
    }

}
