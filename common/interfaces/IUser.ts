export interface IRoles {
    admin?: boolean;
    user?: boolean;
    editor?: boolean;
}

export type RecentlyUsedProjects = string[];

export interface IUser {
    tasks: Map<string, true>;
    roles: IRoles;
    name: string;
    defaultTask?: string;
    recentProjects: RecentlyUsedProjects;
    defaultClient?: string;
    team?: string;
    created?: Date;
}

export interface IAuthenticatedUser extends IUser {
    id: string;
}
