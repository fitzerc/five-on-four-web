export interface FiveOnFourUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    picture?: any;
    token?: string;
    roles?: UserRole[]
}

export interface UserRole {
    CreatedAt: Date;
    DeletedAt: Date;
    ID: number;
    UpdatedAt: Date;
    role: string;
    role_description: string;
    user_id: number;
}

export function isAdmin(roles: UserRole[]): boolean {
    return roles
        ? roles.some(x => x.role === 'admin')
        : false;
}