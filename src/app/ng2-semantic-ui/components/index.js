var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from "@angular/core";
import { SuiAccordionModule } from "./accordion/accordion.module";
import { SuiCheckboxModule } from "./checkbox/checkbox.module";
import { SuiCollapseModule } from "./collapse/collapse.module";
import { SuiDimmerModule } from "./dimmer/dimmer.module";
import { SuiDropdownModule } from "./dropdown/dropdown.module";
import { SuiMessageModule } from "./message/message.module";
import { SuiProgressModule } from "./progress/progress.module";
import { SuiRatingModule } from "./rating/rating.module";
import { SuiSearchModule } from "./search/search.module";
import { SuiTabsModule } from "./tabs/tab.module";
import { SuiSelectModule } from "./select/select.module";
import { SuiTransitionModule } from "./transition/transition.module";
import { SuiInputSelectModule } from "./inputselect/inputselect.module";
var SuiModule = (function () {
    function SuiModule() {
    }
    return SuiModule;
}());
SuiModule = __decorate([
    NgModule({
        exports: [
            SuiAccordionModule,
            SuiCheckboxModule,
            SuiCollapseModule,
            SuiDimmerModule,
            SuiDropdownModule,
            SuiMessageModule,
            SuiProgressModule,
            SuiRatingModule,
            SuiSearchModule,
            SuiSelectModule,
            SuiTabsModule,
            SuiTransitionModule,
            SuiInputSelectModule
        ]
    })
], SuiModule);
export { SuiModule };
export { SuiAccordionModule };
export { SuiCheckboxModule };
export { SuiCollapseModule };
export { SuiDimmerModule };
export { SuiDropdownModule };
export { SuiMessageModule };
export { SuiProgressModule };
export { SuiRatingModule };
export { SuiSearchModule };
export { SuiSelectModule };
export { SuiTabsModule };
export { SuiTransitionModule };
export { SuiInputSelectModule };
//# sourceMappingURL=index.js.map