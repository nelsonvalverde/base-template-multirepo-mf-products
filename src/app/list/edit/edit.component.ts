import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../shared/models/product.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { EditPresenter } from './edit.presenter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    RadioButtonModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {

  @Output() onSave = new EventEmitter<void>();

  public submitted: boolean = false;
  public statuses: { label: string, value: string }[] = [];
  public editPresenter = inject(EditPresenter);

  public ngOnInit(): void {
    this.statuses = [
      { label: 'INSTOCK', value: 'INSTOCK' },
      { label: 'LOWSTOCK', value: 'LOWSTOCK' },
      { label: 'OUTOFSTOCK', value: 'OUTOFSTOCK' }
    ];
  }



  public getSeverity(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default: return 'secondary';
    }
  }

  public hideDialog(): void {
    this.editPresenter.isShowDialog.set(false);
  }

  public saveProduct(): void {
    this.onSave.emit();
  }

}
