import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../../domains/user/entities/user.entity";
import { UserGateway } from "../../../domains/user/gateway/user.gateway";

export class UserRepository implements UserGateway {

    private constructor(private readonly client : PrismaClient) {}

    public static build(client : PrismaClient) {
        return new UserRepository(client)
    }

    async create(user: UserEntity): Promise<void> {

        await this.client.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
    }

    async findByEmail(email : string) : Promise<UserEntity | null> {

        const user = await this.client.user.findFirst({
            where: {
                email
            }
        })

        return user ? UserEntity.build({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password, 
            createdAt: user.createdAt
        }) : null   
    }

}