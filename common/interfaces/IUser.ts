export interface IRoles {
    admin?: boolean;
    user?: boolean;
}

export type RecentlyUsedProjects = string[];

export interface IUser {
    tasks: Map<string, true>;
    roles: IRoles;
    name: string;
    defaultTask?: string;
    recentProjects: RecentlyUsedProjects;
    defaultClient?: string;
}