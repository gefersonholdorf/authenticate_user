export interface UserProps {
    id ?: number
    name : string
    email : string
    password : string
    createdAt ?: Date
}

export class UserEntity {
    private constructor (private props : UserProps) {}

    public static build(props : UserProps) {
        return new UserEntity({
            id : props.id,
            name: props.name,
            email: props.email,
            password: props.password,
            createdAt: props.createdAt
        })
    }

    public get name() {
        return this.props.name
    }

    public get id() {
        return this.props.id
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }

    public get createdAt() {
        return this.props.createdAt
    }
}