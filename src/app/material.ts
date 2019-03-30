import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [MatButtonModule, 
        MatCheckboxModule, 
        MatAutocompleteModule, 
        MatFormFieldModule, 
        MatListModule,
        MatDialogModule],
    exports: [MatButtonModule, 
        MatCheckboxModule,
        MatAutocompleteModule, 
        MatFormFieldModule, 
        MatListModule,
        MatDialogModule],
})
export class MaterialModule{};