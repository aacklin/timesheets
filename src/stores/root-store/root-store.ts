import { RouterStore } from "mobx-router";

import { IRegistrationsStore, RegistrationStore } from "../registration-store/registration-store";
import { IConfigStore, ConfigStore } from "../config-store";
import { IUserStore, UserStore } from "../user-store";
import { IViewStore, ViewStore } from "../view-store";
import { IReportStore, ReportStore } from "../report-store/report-store";
import { DashboardStore, IDashboardStore } from "../dashboard-store";
import { IProjectStore, ProjectStore } from "../project-store";
import { FavoriteStore } from "../favorite-store";

export interface IRootStore {
    readonly user: IUserStore;
    readonly view: IViewStore;
    readonly router: RouterStore<IRootStore>;
    readonly timesheets: IRegistrationsStore;
    readonly reports: IReportStore;
    readonly config: IConfigStore;
    readonly projects: IProjectStore;
    readonly favorites: FavoriteStore;
    readonly dashboard: IDashboardStore;
}

export class Store implements IRootStore {
    public readonly timesheets: IRegistrationsStore;
    public readonly view: IViewStore;
    public readonly user: IUserStore;
    public readonly config: IConfigStore;
    public readonly router: RouterStore<IRootStore>;
    public readonly reports: IReportStore;
    public readonly dashboard: IDashboardStore;
    public readonly projects: IProjectStore;
    public readonly favorites: FavoriteStore;

    constructor({
        auth,
        firestore,
    }: {
        firestore: firebase.firestore.Firestore,
        auth?: firebase.auth.Auth,
    }) {
        this.user = new UserStore(
            this,
            {
                auth,
                firestore,
            }
        );

        this.view = new ViewStore(this);
        this.config = new ConfigStore(
            this,
            {
                firestore,
            },
        );
        this.timesheets = new RegistrationStore(
            this,
            {
                firestore,
            },
        );
        this.reports = new ReportStore(
            this,
            {
                firestore,
            },
        );
        this.dashboard = new DashboardStore(
            this,
            {
                firestore,
            },
        );
        this.projects = new ProjectStore(
            this,
            {
                firestore,
            },
        );
        this.favorites = new FavoriteStore(
            this,
            {
                firestore,
            },
        );
        this.router = new RouterStore<IRootStore>(this);
    }

    public dispose() {
        // this.config.dispose();
        // this.dashboard.dispose();
        // this.favorites.dispose();
        // this.projects.dispose();
        // this.reports.dispose();
        // this.timesheets.dispose();
        this.user.dispose();
        // this.view.dispose();
    }
};
