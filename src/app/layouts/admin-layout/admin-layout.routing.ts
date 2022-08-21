import { Routes } from "@angular/router";
import { AuthenticationComponent } from "app/modules/authentication/authentication.component";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { BirdsComponent } from "../../modules/birds/birds.component";
import { CreationControlComponent } from "../../modules/creation-control/creation-control.component";
import { AuthGuard } from "../../services/guard/auth.guard";
export const AdminLayoutRoutes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    { path: "aves", component: BirdsComponent, canActivate: [AuthGuard] },
    {
        path: "posturas",
        component: CreationControlComponent,
        canActivate: [AuthGuard]
    },
    { path: "login", component: AuthenticationComponent }
];
