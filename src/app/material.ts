import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [MatButtonModule, 
        MatCheckboxModule, 
        MatAutocompleteModule, 
        MatFormFieldModule, 
        MatListModule],
    exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatListModule],
})
export class MaterialModule{};