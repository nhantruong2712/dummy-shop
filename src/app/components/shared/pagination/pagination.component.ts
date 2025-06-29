import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges {
  @Input() pagination!: PaginationInfo;
  @Input() maxVisiblePages: number = 5;
  
  @Output() pageChanged = new EventEmitter<number>();
  
  visiblePages: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pagination'] && this.pagination) {
      this.calculateVisiblePages();
    }
  }

  private calculateVisiblePages() {
    const { currentPage, totalPages } = this.pagination;
    const half = Math.floor(this.maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + this.maxVisiblePages - 1);
    
    if (end - start < this.maxVisiblePages - 1) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }
    
    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  onPageClick(page: number) {
    if (page !== this.pagination.currentPage && page >= 1 && page <= this.pagination.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  onPrevious() {
    if (this.pagination.currentPage > 1) {
      this.pageChanged.emit(this.pagination.currentPage - 1);
    }
  }

  onNext() {
    if (this.pagination.currentPage < this.pagination.totalPages) {
      this.pageChanged.emit(this.pagination.currentPage + 1);
    }
  }

  onFirst() {
    if (this.pagination.currentPage !== 1) {
      this.pageChanged.emit(1);
    }
  }

  onLast() {
    if (this.pagination.currentPage !== this.pagination.totalPages) {
      this.pageChanged.emit(this.pagination.totalPages);
    }
  }

  get startItem(): number {
    return (this.pagination.currentPage - 1) * this.pagination.limit + 1;
  }

  get endItem(): number {
    return Math.min(this.pagination.currentPage * this.pagination.limit, this.pagination.total);
  }
} 