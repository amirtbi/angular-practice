import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"

@Injectable({
    providedIn:"root"
})
export class WindowService{
    private dialog = inject(MatDialog)

    open<T=unknown,D=unknown>(component:ComponentType<T>,config:MatDialogConfig<D>){
        this.dialog.open(component,config)
    }
}