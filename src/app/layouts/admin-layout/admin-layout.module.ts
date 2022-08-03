import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";

//COMPONENT
import { BirdsComponent } from "../../modules/birds/birds.component";
import { BirdFormComponent } from "../../modules/birds/birds-form/birds-form.component";
import { AuthenticationComponent } from "../../modules/authentication/authentication.component";

import { CreationControlComponent } from "../../modules/creation-control/creation-control.component";
import { CreationControlFormComponent } from "../../modules/creation-control/creation-control-form/creation-control-form.component";

import { AuthGuard } from "../../modules/guard/auth.guard";

//SERVICE
import { CreatoresServices } from "../../services/creators/creators.services";
import { MutationsServices } from "../../services/mutations/mutations.service";
import { BirdsService } from "../../services/birds/birds.service";
import { CreationControlService } from "../../services/creation-control/creation-control.service";
import { AuthService } from "../../services/auth/auth.service";

import { OktaAuth } from "@okta/okta-auth-js";
import { IMaskModule } from "angular-imask";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        IMaskModule
    ],
    declarations: [
        DashboardComponent,
        AuthenticationComponent,
        BirdsComponent,
        BirdFormComponent,
        CreationControlComponent,
        CreationControlFormComponent
    ],
    providers: [
        CreatoresServices,
        MutationsServices,
        BirdsService,
        CreationControlService,
        AuthService,
        AuthGuard,
        {
            provide: OktaAuth,
            useValue: new OktaAuth({
                issuer: "https://dev-73372890.okta.com/oauth2/default",
                clientId: "0oa616n0l7KRx5Uwh5d7"
            })
        }
    ]
})
export class AdminLayoutModule {}
