import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule],
    exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule],
})
export class MaterialModule{};