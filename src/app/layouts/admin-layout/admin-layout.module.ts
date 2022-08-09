import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { IMaskModule } from "angular-imask";
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
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatIconModule } from "@angular/material/icon";

//
import { AdminLayoutRoutes } from "./admin-layout.routing";

//COMPONENT
import { BirdsComponent } from "../../modules/birds/birds.component";
import { BirdFormComponent } from "../../modules/birds/birds-form/birds-form.component";
import { AuthenticationComponent } from "../../modules/authentication/authentication.component";

import { CreationControlComponent } from "../../modules/creation-control/creation-control.component";
import { CreationControlFormUpsertComponent } from "../../modules/creation-control/creation-control-form-upsert/creation-control-form-upsert.component";
import { CreationControlFormDeleteComponent } from "../../modules/creation-control/creation-control-form-delete/creation-control-form-delete.component";
import { BirdFormDeleteComponent } from "app/modules/birds/birds-form-delete/birds-form-delete.component";

//SERVICE
import { CreatoresServices } from "../../services/creators/creators.services";
import { MutationsServices } from "../../services/mutations/mutations.service";
import { BirdsService } from "../../services/birds/birds.service";
import { CreationControlService } from "../../services/creation-control/creation-control.service";

import { AuthGuard } from "../../services/guard/auth.guard";
import { JwtAuthService } from "../../services/jwt-auth/jwt-auth.service";
import { UserService } from "../../services/users/users.service";
import { LocalStoreService } from "../../services/local-store/local-store.service";

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
        IMaskModule,
        MatProgressBarModule,
        MatIconModule
    ],
    declarations: [
        DashboardComponent,
        AuthenticationComponent,
        BirdsComponent,
        BirdFormComponent,
        CreationControlComponent,
        CreationControlFormUpsertComponent,
        CreationControlFormDeleteComponent,
        BirdFormDeleteComponent
    ],
    providers: [
        CreatoresServices,
        MutationsServices,
        BirdsService,
        CreationControlService,
        AuthGuard,
        JwtAuthService,
        UserService,
        LocalStoreService
    ]
})
export class AdminLayoutModule {}
