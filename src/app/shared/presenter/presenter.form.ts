import { FormGroup } from "@angular/forms";

export class PresenterForm<T> {
  protected form!: FormGroup;
  public get Form(): FormGroup {
    return this.form;
  }

  public get Values(): T {
    return this.form.value as T;
  }

  public get Disabled(): boolean {
    return this.form.disabled;
  }

  public get Dirty(): boolean {
    return this.form.dirty;
  }

  public get Invalid(): boolean {
    return this.form.invalid;
  }

  public get Valid(): boolean {
    return this.form.valid;
  }

  public reset(): void {
    this.form.reset();
  }

  public pathValue(
    model: { [key: string]: any },
    options: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    this.form.patchValue(model, options);
  }
}
