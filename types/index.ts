export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    AUTHOR = 'author',
    USER = 'user',
}

export interface UserDto {
    [x: string]: any;
    id?: number;
    name: string;
    domain:string;
    email?: string;
    password?: string;
    bio?: string;
    occupation?: string;
    role?: UserRole;
    profileImage?: string;
    blogs?: Blog[];
}
export interface Blog {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
    author?: UserDto;
    featuredImg?: string;
    publishedDate?: Date;
    isPublished?: boolean;
    categories?: CategoryEntry[];
}

export interface CategoryEntry {
    id?: number;
    name?: string;
    blogEntries?: Blog[];
}

export interface IComment {
    id: number;
    message: string;
    author?: UserDto;
    blog?: Blog;
    createdAt?: Date;
    updatedAt?: Date;
}

