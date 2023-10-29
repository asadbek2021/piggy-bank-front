import { Component, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() searchValue = new EventEmitter<string>();

  onInput(value: string) {
    this.searchValue.emit(value);
  }
}
