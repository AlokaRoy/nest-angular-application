import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = []; 
  product: Product = {id:0, name:"", description:"", price:0};
  ;
  editMode: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  addProduct(): void {
    this.productService.addProduct(this.product)
      .subscribe(product => {
        this.products.push(product);
        this.resetForm();
      });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id)
      .subscribe(() => {
        this.products = this.products.filter(p => p !== product);
      });
  }

  editProduct(product: Product): void {
    this.product = product;
    this.editMode = true;
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product)
      .subscribe(() => {
        this.resetForm();
      });
  }

  resetForm(): void {
    this.product = {id:0, name:"", description:"", price:0};
    this.editMode = false;
  }
}
