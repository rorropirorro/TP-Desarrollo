import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cargar-producto',
  templateUrl: './cargar-producto.component.html',
  styleUrls: ['./cargar-producto.component.css']
})
export class CargarProductoComponent implements OnInit{

  producto: any = {};
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  categorias: any[] = [];
  caracteristicas: any[] = [];
  selectedCategory: { ID: number, Nombre: string } = { ID: 0, Nombre: '' };
  selectedCharacteristic: string = '';
  filtredCharacteristics: any[] = [];
  profileForm = new FormGroup({
    productName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    productCategory: new FormControl('', [Validators.required]),
    productCharacteristic: new FormControl([], [Validators.required]), //new FormArray([]),
    productPrice: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    productStock: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    productDescription: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    productPhoto: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/categorias.json').subscribe(data => {
      this.categorias = data;
    });

    this.http.get<any[]>('assets/caracteristicas.json').subscribe(data => {
      this.caracteristicas = data;
    });

  }

  onCategoryChange() {
    this.selectedCategory.ID = this.categorias.find(
      (categoria) => categoria.Descripcion === this.selectedCategory.Nombre
    )?.ID;
  
    // Create new FormControls based on filtered characteristics
    this.filtredCharacteristics = this.caracteristicas.filter(
      (caracteristica) => caracteristica.IDCategoria === this.selectedCategory.ID
    );
  
    const productCharacteristicArray = this.profileForm.get('productCharacteristic') as FormArray;
    productCharacteristicArray.clear();
  
    this.filtredCharacteristics.forEach(() => {
      productCharacteristicArray.push(new FormControl(''));
    });
    //this.selectedCategory.ID = this.categorias.find(categoria => categoria.Descripcion === this.selectedCategory.Nombre)?.ID;
    //this.filtredCharacteristics = this.caracteristicas.filter(caracteristica => caracteristica.IDCategoria === this.selectedCategory.ID);
  }

  guardarProducto() {
    console.log('Producto a guardar:', this.profileForm.value);
  }

  isButtonDisabled() {
    
    return this.profileForm.invalid;
  }

  onFileSelected(event: any) {
    const file: File | null = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage();
    } else {
      this.selectedFile = null;
      this.imageSrc = null;
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as File);
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
  }


}

