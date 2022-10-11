import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainLayoutComponent } from "./shared/layouts/main-layout/main-layout.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ModalComponent } from "./shared/modal/modal.component";

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            {path: '', redirectTo: '/files', pathMatch: 'full'},
            {path: 'files', component: FileUploadComponent},
            {path: 'files/:id', component: ModalComponent},
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule {

}