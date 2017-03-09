var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SuiDropdownModule } from "../dropdown/dropdown.module";
import { SuiSearchModule } from "../search/search.module";
import { SUI_INPUT_SELECT_DIRECTIVES } from "./inputselect";
import { SuiTransitionModule } from "../transition/transition.module";
var SuiInputSelectModule = (function () {
    function SuiInputSelectModule() {
    }
    return SuiInputSelectModule;
}());
SuiInputSelectModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule, SuiDropdownModule, SuiSearchModule, SuiTransitionModule],
        declarations: SUI_INPUT_SELECT_DIRECTIVES,
        exports: SUI_INPUT_SELECT_DIRECTIVES
    })
], SuiInputSelectModule);
export { SuiInputSelectModule };
//# sourceMappingURL=inputselect.module.js.map