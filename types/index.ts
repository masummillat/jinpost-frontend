export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',
    EDITOR = 'editor',
    USER = 'user',
}

export interface UserDto {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    bio?: string;
    occupation?: string;
    role?: UserRole;
    profileImage?: string;
    Blogs?: Blog[];
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


