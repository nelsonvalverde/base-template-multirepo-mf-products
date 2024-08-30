import { Injectable, signal, WritableSignal } from "@angular/core";
import { PresenterForm } from "../../shared/presenter/presenter.form";
import { Product } from "../../shared/models/product.model";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Injectable()
export class EditPresenter extends PresenterForm<Product> {
  id!: FormControl;
  image!: FormControl;
  name!: FormControl;
  description!: FormControl;
  inventoryStatus!: FormControl;
  category!: FormControl;
  price!: FormControl;
  quantity!: FormControl;

  isShowDialog!: WritableSignal<boolean>;

  constructor(private readonly _formBuilder: FormBuilder) {
    super();
    this.createControl();
    this.createValidator();
    this.initForm();
    this.initSignal();
  }

  public setForm(product?: Product | null): void {
    if (product) {
      this.pathValue(product, {
        onlySelf: true
      });
    }
  }

  private initForm(): void {
    this.form = this._formBuilder.group({
      id: this.id,
      image: this.image,
      name: this.name,
      description: this.description,
      inventoryStatus: this.inventoryStatus,
      category: this.category,
      price: this.price,
      quantity: this.quantity
    }, {
      validators: []
    });
  }

  private initSignal(): void{
    this.isShowDialog = signal(false);
  }

  private createValidator(): void {
    this.name = new FormControl<string>('', [Validators.required]);
    this.inventoryStatus = new FormControl<string>('', [Validators.required]);
    this.category = new FormControl<string>('', [Validators.required]);
    this.price = new FormControl<number>(0.00, [Validators.required]);
    this.quantity = new FormControl<number>(0, [Validators.required]);
  }

  private createControl(): void {
    this.id = new FormControl<string | null>(null);
    this.image = new FormControl<string | null>(null);
    this.description = new FormControl<string | null>(null);
  }

}
