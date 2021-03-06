import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { SidebarService } from './sidebar.service';

@Component({
  selector: 'ng-sidebar',
  template: `
    <aside #sidebar
      role="complementary"
      [attr.aria-hidden]="!opened"
      [attr.aria-label]="ariaLabel"
      class="ng-sidebar ng-sidebar--{{opened ? 'opened' : 'closed'}} ng-sidebar--{{position}} ng-sidebar--{{mode}}"
      [class.ng-sidebar--inert]="!opened && mode !== 'dock'"
      [class.ng-sidebar--animate]="animate"
      [ngClass]="sidebarClass"
      [ngStyle]="_getStyle()">
      <ng-content></ng-content>
    </aside>
  `,
  styles: [`
    .ng-sidebar {
      background-color: #fff;
      overflow: auto;
      pointer-events: auto;
      position: fixed;
      will-change: initial;
      z-index: 99999999;
      width: 15rem;
    }

      .ng-sidebar--left {
        bottom: 0;
        left: 0;
        top: 0;
      }

      .ng-sidebar--right {
        bottom: 0;
        right: 0;
        top: 0;
      }

      .ng-sidebar--top {
        left: 0;
        right: 0;
        top: 0;
      }

      .ng-sidebar--bottom {
        bottom: 0;
        left: 0;
        right: 0;
      }

    .ng-sidebar--inert {
      pointer-events: none;
      will-change: transform;
    }

    .ng-sidebar--animate.ng-sidebar {
      -webkit-transition: -webkit-transform 0.3s cubic-bezier(0, 0, 0.3, 1);
      transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class Sidebar implements OnChanges, OnDestroy {
  // `openedChange` allows for "2-way" data binding
  @Input() opened: boolean = false;
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  // Fix 1
  // @Input() mode: 'over' | 'push' | 'dock' = 'over';
  mode = 'over';
  
  // Exclude 1
  @Input() dockedSize: string = '0px';
  
  // Fix 2
  // @Input() position: 'start' | 'end' | 'left' | 'right' | 'top' | 'bottom' = 'start';
  position = 'left';

  // Fix 3
  // @Input() animate: boolean = true;
  animate = true;

  @Input() sidebarClass: string;

  @Input() ariaLabel: string;
  
  // Fix 4
  // @Input() trapFocus: boolean = true;
  trapFocus = false;
  
  // @Input() autoFocus: boolean = true;
  autoFocus = false;

  // Temporary Change 1: false -> true
  @Input() showBackdrop: boolean = true;
  // showBackdrop = true;
  
  
  // Fix 5
  // @Input() closeOnClickOutside: boolean = false;
  closeOnClickOutside = true;

  // Fix 6
  // @Input() keyClose: boolean = false;
  keyClose = false;
  

  // Fix 7
  // @Input() keyCode: number = 27;  // Default to ESCAPE key
  keyCode = 27;


  @Output() onOpenStart: EventEmitter<null> = new EventEmitter<null>();
  @Output() onOpened: EventEmitter<null> = new EventEmitter<null>();
  @Output() onCloseStart: EventEmitter<null> = new EventEmitter<null>();
  @Output() onClosed: EventEmitter<null> = new EventEmitter<null>();
  @Output() onModeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onPositionChange: EventEmitter<string> = new EventEmitter<string>();

  /** @internal */
  @ViewChild('sidebar')
  _elSidebar: ElementRef;

  private _openSub: Subscription;
  private _closeSub: Subscription;

  private _focusableElementsString: string = 'a[href], area[href], input:not([disabled]), select:not([disabled]),' +
    'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
  private _focusableElements: Array<HTMLElement>;
  private _focusedBeforeOpen: HTMLElement;

  private _clickEvent: string = 'click';
  private _onClickOutsideAttached: boolean = false;
  private _onKeyDownAttached: boolean = false;

  constructor(
    @Inject(DOCUMENT) private _document /*: HTMLDocument */,
    private _sidebarService: SidebarService) {
    if (this._isIOS() && 'ontouchstart' in window) {
      this._clickEvent = 'touchstart';
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this._onTransitionEnd = this._onTransitionEnd.bind(this);
    this._onFocusTrap = this._onFocusTrap.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this._openSub = this._sidebarService.onOpen(this.open);
    this._closeSub = this._sidebarService.onClose(this.close);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['opened']) {
      if (changes['opened'].currentValue) {
        this.open();
      } else {
        this.close();
      }
    }

    if (changes['closeOnClickOutside'] || changes['keyClose']) {
      this._initCloseListeners();
    }

    if (changes['position']) {
      // Handle "start" and "end" aliases
      if (this.position === 'start') {
        this.position = this._isLTR ? 'left' : 'right';
      } else if (this.position === 'end') {
        this.position = this._isLTR ? 'right' : 'left';
      }

      // Emit change in timeout to allow for position change to be rendered first
      setTimeout(() => {
        this.onPositionChange.emit(changes['position'].currentValue);
      });
    }

    if (changes['mode']) {
      this.onModeChange.emit(changes['mode'].currentValue);
    }
  }

  ngOnDestroy(): void {
    this._destroyCloseListeners();

    this._openSub.unsubscribe();
    this._closeSub.unsubscribe();
  }


  // Sidebar toggling
  // ==============================================================================================

  /**
   * Opens the sidebar and emits the appropriate events.
   */
  open(): void {
    this.opened = true;
    this.openedChange.emit(true);

    this.onOpenStart.emit();

    this._elSidebar.nativeElement.addEventListener('transitionend', this._onTransitionEnd);

    this._setFocused();
    this._initCloseListeners();

    if (!this.animate) {
      setTimeout(() => {
        if (this.opened) {
          this.onOpened.emit();
        }
      });
    }
  }

  /**
   * Closes the sidebar and emits the appropriate events.
   */
  close(): void {
    this.opened = false;
    this.openedChange.emit(false);

    this.onCloseStart.emit();

    this._elSidebar.nativeElement.addEventListener('transitionend', this._onTransitionEnd);

    this._setFocused();
    this._destroyCloseListeners();

    if (!this.animate) {
      setTimeout(() => {
        if (!this.opened) {
          this.onClosed.emit();
        }
      });
    }
  }

  /**
   * @internal
   *
   * Computes the transform styles for the sidebar template.
   *
   * @return {CSSStyleDeclaration} The transform styles, with the WebKit-prefixed version as well.
   */
  _getStyle(): CSSStyleDeclaration {
    let transformStyle: string = 'none';
    let marginStyle = {};

    if (!this.opened) {
      transformStyle = `translate${(this.position === 'left' || this.position === 'right') ? 'X' : 'Y'}`;

      const isLeftOrTop: boolean = this.position === 'left' || this.position === 'top';
      const isDockMode: boolean = this.mode === 'dock';

      // We use 110% for non-docked modes in an attempt to hide any box-shadow
      const translateAmt: string = `${isLeftOrTop ? '-' : ''}${isDockMode ? '100' : '110'}%`;

      if (isDockMode && parseFloat(this.dockedSize) > 0) {
        const marginPos = `margin${this._upperCaseFirst(this.position)}`;

        marginStyle = {
          [marginPos]: this.dockedSize
        };
      }

      transformStyle += `(${translateAmt})`;
    }

    return Object.assign(marginStyle, {
      webkitTransform: transformStyle,
      transform: transformStyle
    }) as CSSStyleDeclaration;
  }

  /**
   * @internal
   *
   * Handles the `transitionend` event on the sidebar to emit the onOpened/onClosed events after
   * the transform transition is completed.
   */
  _onTransitionEnd(e: TransitionEvent): void {
    if (e.target === this._elSidebar.nativeElement && e.propertyName.endsWith('transform')) {
      if (this.opened) {
        this.onOpened.emit();
      } else {
        this.onClosed.emit();
      }

      this._elSidebar.nativeElement.removeEventListener('transitionend', this._onTransitionEnd);
    }
  }

@HostListener("window:scroll", [])
onWindowScroll() {
  if (this.opened)
    {
    this.close();
    }
 //we'll do some stuff here when the window is scrolled
}
  // Focus on open/close
  // ==============================================================================================

  /**
   * Returns whether focus should be trapped within the sidebar.
   *
   * @return {boolean} Trap focus inside sidebar.
   */
  private get _shouldTrapFocus(): boolean {
    return this.opened && this.trapFocus && this._isModeOver;
  }

  /**
   * Sets focus to the first focusable element inside the sidebar.
   */
  private _focusFirstItem(): void {
    if (this._focusableElements && this._focusableElements.length) {
      this._focusableElements[0].focus();
    }
  }

  /**
   * Loops focus back to the start of the sidebar if set to do so.
   */
  private _onFocusTrap(e: FocusEvent): void {
    if (this._shouldTrapFocus && !this._elSidebar.nativeElement.contains(e.target)) {
      this._focusFirstItem();
    }
  }

  /**
   * Handles the ability to focus sidebar elements when it's open/closed to ensure that the sidebar is inert
   * when appropriate.
   */
  private _setFocused(): void {
    this._focusableElements = Array.from(
      this._elSidebar.nativeElement.querySelectorAll(this._focusableElementsString)) as Array<HTMLElement>;

    if (this.opened) {
      this._focusedBeforeOpen = this._document.activeElement as HTMLElement;

      // Restore focusability, with previous tabindex attributes
      for (let el of this._focusableElements) {
        const prevTabIndex = el.getAttribute('__tabindex__');
        if (prevTabIndex) {
          el.setAttribute('tabindex', prevTabIndex);
          el.removeAttribute('__tabindex__');
        } else {
          el.removeAttribute('tabindex');
        }
      }

      if (this.autoFocus) {
        this._focusFirstItem();
      }

      this._document.addEventListener('focus', this._onFocusTrap, true);
    } else {
      // Manually make all focusable elements unfocusable, saving existing tabindex attributes
      for (let el of this._focusableElements) {
        const existingTabIndex = el.getAttribute('tabindex');
        if (existingTabIndex) {
          el.setAttribute('__tabindex__', existingTabIndex);
        }

        el.setAttribute('tabindex', '-1');
      }

      this._document.removeEventListener('focus', this._onFocusTrap, true);

      // Set focus back to element before the sidebar was opened
      if (this.autoFocus && this._isModeOver && this._focusedBeforeOpen) {
        this._focusedBeforeOpen.focus();
      }
    }
  }


  // Close event handlers
  // ==============================================================================================

  /**
   * Initializes event handlers for the closeOnClickOutside and keyClose options.
   */
  private _initCloseListeners(): void {
    if (this.opened && (this.closeOnClickOutside || this.keyClose)) {
      // In a timeout so that things render first
      setTimeout(() => {
        if (this.closeOnClickOutside && !this._onClickOutsideAttached) {
          this._document.addEventListener(this._clickEvent, this._onClickOutside);
          this._onClickOutsideAttached = true;
        }

        if (this.keyClose && !this._onKeyDownAttached) {
          this._document.addEventListener('keydown', this._onKeyDown);
          this._onKeyDownAttached = true;
        }
      });
    }
  }

  /**
   * Destroys the event handlers from _initCloseListeners.
   */
  private _destroyCloseListeners(): void {
    if (this._onClickOutsideAttached) {
      this._document.removeEventListener(this._clickEvent, this._onClickOutside);
      this._onClickOutsideAttached = false;
    }

    if (this._onKeyDownAttached) {
      this._document.removeEventListener('keydown', this._onKeyDown);
      this._onKeyDownAttached = false;
    }
  }

  /**
   * Handles `click` events on anything while the sidebar is open for the closeOnClickOutside option.
   * Programatically closes the sidebar if a click occurs outside the sidebar.
   *
   * @param e {MouseEvent} Mouse click event.
   */
  private _onClickOutside(e: MouseEvent): void {
    if (this._onClickOutsideAttached && this._elSidebar && !this._elSidebar.nativeElement.contains(e.target)) {
      this.close();
    }
  }

  /**
   * Handles the `keydown` event for the keyClose option.
   *
   * @param e {KeyboardEvent} Normalized keydown event.
   */
  private _onKeyDown(e: KeyboardEvent | Event): void {
    e = e || window.event;

    if ((e as KeyboardEvent).keyCode === this.keyCode) {
      this.close();
    }
  }


  // Helpers
  // ==============================================================================================

  /**
   * Returns whether the sidebar is "docked" -- i.e. it is closed but in dock mode.
   *
   * @return {boolean} Sidebar is docked.
   */
  private get _isDocked(): boolean {
    return this.mode === 'dock' && this.dockedSize && !this.opened;
  }

  /**
   * Returns whether the sidebar is set to the default "over" mode.
   *
   * @return {boolean} Sidebar mode is "over".
   */
  private get _isModeOver(): boolean {
    return this.mode === 'over';
  }

  /**
   * @internal
   *
   * Returns the rendered height of the sidebar (or the docked size).
   * This is used in the sidebar container.
   *
   * @return {number} Height of sidebar.
   */
  get _height(): number {
    if (this._elSidebar.nativeElement) {
      return this._isDocked ?
        parseFloat(this.dockedSize) :
        this._elSidebar.nativeElement.offsetHeight;
    }

    return 0;
  }

  /**
   * @internal
   *
   * Returns the rendered width of the sidebar (or the docked size).
   * This is used in the sidebar container.
   *
   * @return {number} Width of sidebar.
   */
  get _width(): number {
    if (this._elSidebar.nativeElement) {
      return this._isDocked ?
        parseFloat(this.dockedSize) :
        this._elSidebar.nativeElement.offsetWidth;
    }

    return 0;
  }

  /**
   * Makes a string's first letter uppercase.
   *
   * @return {string} Original string, but with first letter in upper case.
   */
  private _upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  /**
   * Returns whether the page is in LTR mode. Defaults to `true` if it can't be computed.
   *
   * @return {boolean} Page's language direction is left-to-right.
   */
  private get _isLTR(): boolean {
    let dir: string = 'ltr';

    // If `window` doesn't exist, this isn't in the context of a browser...
    if (window) {
      if (window.getComputedStyle) {
        dir = window.getComputedStyle(this._document.body, null).getPropertyValue('direction');
      } else {
        dir = this._document.body.currentStyle.direction;
      }
    }

    return dir === 'ltr';
  }

  /**
   * Returns whether or not the current device is an iOS device.
   *
   * @return {boolean} Device is an iOS device (i.e. iPod touch/iPhone/iPad).
   */
  private _isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  }
}
