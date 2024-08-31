import { Component, OnInit, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { Product } from '../shared/models/product.model';
import { ProductService } from '../shared/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditComponent } from "./edit/edit.component";
import { EditPresenter } from './edit/edit.presenter';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    FormsModule,
    RatingModule,
    EditComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ProductService, MessageService, ConfirmationService, EditPresenter]
})
export class ListComponent implements OnInit {
  @ViewChild(Table) table!: Table;

  products: Product[] = [];
  productSelected?: Product | null;
  selectedProducts: Product[] = [];
  // submitted: boolean = false;
  // statuses: { label: string, value: string }[] = [];

  public editPresenter = inject(EditPresenter);

  private _productService = inject(ProductService);
  private _messageService = inject(MessageService);
  private _confirmationService = inject(ConfirmationService);
  private _cd = inject(ChangeDetectorRef);

  ngOnInit(): void {

    this._productService.getProducts().then((data) => {
      this.products = data;
      this._cd.detectChanges();
    });

  }

  openNew(): void {
    this.editPresenter.reset();
    this.editPresenter.isShowDialog.set(true);
  }

  deleteSelectedProducts(): void {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = [];
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product): void {
    this.productSelected = { ...product };
    this.editPresenter.isShowDialog.set(true);
    this.editPresenter.setForm(product);
  }

  deleteProduct(product: Product): void {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        // this.product = null;
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  // hideDialog(): void {
  //   this.dialogIsShow = false;
  //   this.submitted = false;
  // }

  saveProduct(): void {
    // this.submitted = true;
    if (this.editPresenter.Valid) {
      const id = this.editPresenter.id.value;
      if (id) {
        this.products[this.findIndexById(id)] = this.editPresenter.Values;
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.editPresenter.id.setValue(this.createId());
        this.editPresenter.image.setValue('product-placeholder.svg');
        this.products.push(this.editPresenter.Values);
        this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }
      this.products = [...this.products];
      this._cd.detectChanges();
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string): 'success' | 'warning' | 'danger' | 'secondary' {
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

  filterGlobal(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.table.filterGlobal(value, 'contains');
  }

  get globalFilterFields(): string[] {
    return ['name', 'description', 'price', 'category'];
  }
}
