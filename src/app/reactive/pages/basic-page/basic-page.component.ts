import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx5090 = {
  name: 'RTX5090',
  price: 2500,
  inStorage:6,
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{

  // public  myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['',[ Validators.required, Validators.minLength(3) ]],
    price:[0, [Validators.required, Validators.min(0)]],
    inStorage:[0, [Validators.required, Validators.min(0)] ],
  })

  constructor( private fb: FormBuilder){}

  ngOnInit(): void {
    //aqui simulamos que posiblemente el backend me envie un producto y tomamos sus valores
    //this.myForm.reset(rtx5090);
  }

  isValidField( field: string): boolean | null {
    return this.myForm.controls[field].errors
        && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
     switch( key ){
      case 'required':
        return 'Este campo es requerido';
      case 'minlength':
        return `Minimo ${ errors['minlength'].requiredLength } caracters.`;
      case 'min':
        return `El valor debe ser mayor o igual a ${ errors['min'].min } `;
     }
    }
    return null;

  }

  onSave(): void {
    if( this.myForm.invalid ) {
      //markAllAsTouched() marca todos los campos como tocados y dispara las validaciones pertinentes
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    /* reset() restablece el formulario a sus valores iniciales tanto de controles
    como de estados,*/
    this.myForm.reset({ price: 0, inStorage: 0});
  }
}
