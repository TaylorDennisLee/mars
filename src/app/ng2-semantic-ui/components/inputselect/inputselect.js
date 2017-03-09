var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, ViewChild, HostBinding, ElementRef, HostListener, forwardRef, TemplateRef, ViewContainerRef, QueryList, ContentChildren, EventEmitter, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SuiDropdownMenu } from "../dropdown/dropdown-menu";
import { SuiInputSelectOption } from "./inputselect-option";
import { KeyCode } from '../../components/dropdown/dropdown.service';
import { SuiDropdownService } from "../dropdown/dropdown.service";
import { Input, Output } from "@angular/core";
import { SuiSearchService } from "../search/search.service";
var SuiInputSelect = (function () {
    function SuiInputSelect(el) {
        var _this = this;
        this.el = el;
        this._dropdownService = new SuiDropdownService();
        this._searchService = new SuiSearchService();
        this.renderedOptionsSubscriptions = [];
        this.searchClasses = true;
        this.tabIndex = 0;
        this.isSearchable = false;
        this.placeholder = "Select one";
        this.selectedOptionChange = new EventEmitter();
        this.onItemSelected = new EventEmitter();
        this._dropdownService.dropdownElement = el;
        this._dropdownService.autoClose = "outsideClick";
        this._dropdownService.itemClass = "item";
        this._dropdownService.itemSelectedClass = "selected";
        this._searchService.allowEmptyQuery = true;
        this._searchService.searchDelay = 0;
        this._dropdownService.isOpenChange
            .subscribe(function (isOpen) {
            if (isOpen) {
                if (_this.isSearchable && !_this._dropdownService.selectedItem) {
                    _this._dropdownService.selectNextItem();
                }
            }
        });
    }
    Object.defineProperty(SuiInputSelect.prototype, "options", {
        get: function () {
            return this._searchService.options;
        },
        set: function (value) {
            var _this = this;
            this._searchService.options = value;
            if (this.options.length > 0 && !this.options.find(function (o) { return o == _this.selectedOption; })) {
                this.selectedOption = this.options.find(function (o) { return _this.selectedOption == _this._searchService.deepValue(o, _this.keyField); });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "displayField", {
        get: function () {
            return this._searchService.optionsField;
        },
        set: function (value) {
            this._searchService.optionsField = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "query", {
        get: function () {
            return this._searchService.query;
        },
        set: function (value) {
            this._searchService.updateQuery(value);
            this.isOpen = true;
            this.focusFirstItem();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "isActive", {
        get: function () {
            return this._dropdownService.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "isOpen", {
        get: function () {
            return this._dropdownService.isOpen;
        },
        set: function (value) {
            this._dropdownService.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "isDisabled", {
        get: function () {
            return this._dropdownService.isDisabled;
        },
        set: function (value) {
            this._dropdownService.isDisabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "results", {
        get: function () {
            return this._searchService.results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiInputSelect.prototype, "availableOptions", {
        get: function () {
            return this.results;
        },
        enumerable: true,
        configurable: true
    });
    SuiInputSelect.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.renderedOptionsSubscribe();
        this.renderedOptions.changes.subscribe(function () { return _this.renderedOptionsSubscribe(); });
    };
    SuiInputSelect.prototype.ngAfterViewInit = function () {
        this._dropdownMenu.service = this._dropdownService;
    };
    SuiInputSelect.prototype.renderedOptionsSubscribe = function () {
        var _this = this;
        this.renderedOptionsSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this.renderedOptionsSubscriptions = [];
        this.renderedOptions.forEach(function (option) {
            _this.renderedOptionsSubscriptions.push(option.selected.subscribe(function (value) {
                _this.selectOption(value);
            }));
            setTimeout(function () {
                option.useTemplate = !!_this.optionTemplate;
                option.readValue = function (v) { return _this._searchService.readValue(v); };
                if (option.useTemplate) {
                    option.viewContainerRef.clear();
                    option.viewContainerRef.createEmbeddedView(_this.optionTemplate, { option: option.value });
                }
            });
        });
    };
    SuiInputSelect.prototype.renderSelectedItem = function () {
        if (this.selectedOption && this.optionTemplate) {
            this.selectedOptionContainer.clear();
            this.selectedOptionContainer.createEmbeddedView(this.optionTemplate, { option: this.selectedOption });
        }
    };
    SuiInputSelect.prototype.selectOption = function (option) {
        this.selectedOption = option;
        var keyed = this._searchService.deepValue(option, this.keyField);
        this.selectedOptionChange.emit(keyed);
        this.onItemSelected.emit(keyed);
        this._searchService.updateQuery(this._searchService.readValue(option), false);
        this._dropdownService.isOpen = false;
        this.renderSelectedItem();
        this._searchService.updateQuery("", false);
    };
    SuiInputSelect.prototype.focusSearch = function () {
        if (this.isSearchable) {
            this._dropdownService.dropdownElement.nativeElement.querySelector("input").focus();
        }
    };
    SuiInputSelect.prototype.focusFirstItem = function () {
        var _this = this;
        setTimeout(function () {
            _this._dropdownService.selectedItem = null;
            _this._dropdownService.selectNextItem();
        });
    };
    SuiInputSelect.prototype.writeValue = function (value) {
        var _this = this;
        if (value !== null && value !== undefined) {
            this.selectedOption = value;
            if (this.options.length > 0) {
                this.selectedOption = this.options.find(function (o) { return value == _this._searchService.deepValue(o, _this.keyField); });
            }
        }
        this.renderSelectedItem();
    };
    SuiInputSelect.prototype.click = function (event) {
        event.stopPropagation();
        if (!this._dropdownService.menuElement.nativeElement.contains(event.target)) {
            if (!this.isOpen) {
                this.isOpen = true;
                this._searchService.search();
                this.focusSearch();
            }
            else if (event.target.tagName != "INPUT") {
                this.isOpen = false;
            }
        }
        return false;
    };
    SuiInputSelect.prototype.keypress = function (event) {
        if ((event.which == KeyCode.Enter || event.which == KeyCode.Space) && !this.isOpen) {
            this.click(event);
            event.preventDefault();
        }
    };
    return SuiInputSelect;
}());
__decorate([
    ViewChild(SuiDropdownMenu),
    __metadata("design:type", SuiDropdownMenu)
], SuiInputSelect.prototype, "_dropdownMenu", void 0);
__decorate([
    ViewChild('selectedOptionRenderTarget', { read: ViewContainerRef }),
    __metadata("design:type", ViewContainerRef)
], SuiInputSelect.prototype, "selectedOptionContainer", void 0);
__decorate([
    ContentChildren(SuiInputSelectOption),
    __metadata("design:type", QueryList)
], SuiInputSelect.prototype, "renderedOptions", void 0);
__decorate([
    HostBinding('class.ui'),
    HostBinding('class.label'),
    __metadata("design:type", Object)
], SuiInputSelect.prototype, "searchClasses", void 0);
__decorate([
    HostBinding('attr.tabindex'),
    __metadata("design:type", Object)
], SuiInputSelect.prototype, "tabIndex", void 0);
__decorate([
    HostBinding('class.search'),
    Input(),
    __metadata("design:type", Boolean)
], SuiInputSelect.prototype, "isSearchable", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], SuiInputSelect.prototype, "placeholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], SuiInputSelect.prototype, "options", null);
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [String])
], SuiInputSelect.prototype, "displayField", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], SuiInputSelect.prototype, "keyField", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SuiInputSelect.prototype, "selectedOptionChange", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], SuiInputSelect.prototype, "onItemSelected", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], SuiInputSelect.prototype, "optionTemplate", void 0);
__decorate([
    HostBinding('class.visible'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SuiInputSelect.prototype, "isActive", null);
__decorate([
    HostBinding('class.active'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SuiInputSelect.prototype, "isOpen", null);
__decorate([
    HostBinding('class.disabled'),
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SuiInputSelect.prototype, "isDisabled", null);
__decorate([
    HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", Boolean)
], SuiInputSelect.prototype, "click", null);
__decorate([
    HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], SuiInputSelect.prototype, "keypress", null);
SuiInputSelect = __decorate([
    Component({
        selector: 'sui-input-select',
        exportAs: 'suiInputSelect',
        template: "\n<i class=\"dropdown icon\"></i>\n<input *ngIf=\"isSearchable\" class=\"search\" type=\"text\" autocomplete=\"off\" [(ngModel)]=\"query\">\n<!-- Single-select label -->\n<div *ngIf=\"!selectedOption\" class=\"default text\" [class.filtered]=\"query\">{{ placeholder }}</div>\n<div [hidden]=\"!selectedOption\" class=\"text\" [class.filtered]=\"query\">\n    <span #selectedOptionRenderTarget></span>\n    <span *ngIf=\"!optionTemplate\">{{ _searchService.readValue(selectedOption) }}</span>\n</div>\n<!-- Select dropdown menu -->\n<div class=\"menu\" suiDropdownMenu>\n    <ng-content></ng-content>\n    <div *ngIf=\"isSearchable && !results.length\" class=\"message\">No Results</div>\n</div>\n",
        styles: ["\n:host input.search {\n    width: 12em !important;\n}\n.selected-results {\n    display: none;\n}\n"]
    }),
    __metadata("design:paramtypes", [ElementRef])
], SuiInputSelect);
export { SuiInputSelect };
export var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SuiInputSelectValueAccessor; }),
    multi: true
};
var SuiInputSelectValueAccessor = (function () {
    function SuiInputSelectValueAccessor(host) {
        this.host = host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    SuiInputSelectValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    SuiInputSelectValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    SuiInputSelectValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    return SuiInputSelectValueAccessor;
}());
SuiInputSelectValueAccessor = __decorate([
    Directive({
        selector: 'sui-input-select',
        host: { '(selectedOptionChange)': 'onChange($event)' },
        providers: [CUSTOM_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [SuiInputSelect])
], SuiInputSelectValueAccessor);
export { SuiInputSelectValueAccessor };
export var SUI_INPUT_SELECT_DIRECTIVES = [SuiInputSelect, SuiInputSelectOption, SuiInputSelectValueAccessor];
//# sourceMappingURL=inputselect.js.map