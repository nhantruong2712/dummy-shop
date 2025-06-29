import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SafeHtmlPipe } from '@pipes/safe-html.pipe';
import { User } from '@models/user.model';

export interface HeaderMenuAction {
  label: string;
  icon: string;
  action: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() title: string = 'DummyShop';
  @Input() showBackButton: boolean = false;
  @Input() user$!: Observable<User | null>;
  @Input() menuActions: HeaderMenuAction[] = [];
  
  @Output() backClicked = new EventEmitter<void>();
  @Output() menuActionClicked = new EventEmitter<string>();
  
  showMenu = false;

  onBackClick() {
    this.backClicked.emit();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onMenuAction(action: string) {
    this.showMenu = false;
    this.menuActionClicked.emit(action);
  }
} 