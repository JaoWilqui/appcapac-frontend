import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltersFields } from './interface/filter-interface.model';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup = this.fb.group({});
  filters: FiltersFields[] = [];
  @Output() emitFilterValue = new EventEmitter<FormGroup>();
  @Output() emitClearFilter = new EventEmitter<FormGroup>();
  @Input() isLoading: boolean = false;
  @Input()
  set setControls(fields: FiltersFields[]) {
    this.filters = fields;
    for (let field of fields) {
      this.filterForm.addControl(field.name, field.control);
    }
    this.filterFormValueChanges();
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  filterFormValueChanges() {
    this.filterForm.valueChanges.subscribe((form) => {
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          this.filterForm.markAsDirty();
          return;
        }
        if (!form[key]) {
          this.filterForm.markAsPristine();
        }
      });
    });
  }

  submitFilters() {
    this.emitFilterValue.emit(this.filterForm);
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.markAsPristine();
    this.emitClearFilter.emit(this.filterForm);
  }
}
