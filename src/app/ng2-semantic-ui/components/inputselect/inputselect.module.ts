import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SuiDropdownModule} from "../dropdown/dropdown.module";
import {SuiSearchModule} from "../search/search.module";
import {SUI_INPUT_SELECT_DIRECTIVES} from "./inputselect";
import {SuiTransitionModule} from "../transition/transition.module";

@NgModule({
    imports: [CommonModule, FormsModule, SuiDropdownModule, SuiSearchModule, SuiTransitionModule],
    declarations: SUI_INPUT_SELECT_DIRECTIVES,
    exports: SUI_INPUT_SELECT_DIRECTIVES
})
export class SuiInputSelectModule {}
