import { UserEntity } from "../entities/user.entity";

export interface UserGateway {
    create(user : UserEntity) : Promise<void>
    findByEmail(email : string) : Promise<UserEntity | null>
}