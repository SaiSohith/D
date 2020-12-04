import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public contracts;
  public store: Product[] ;
  public i = 0 ;
  public totalprice: number=0;
  public sample;
  public user;
  public err;
  public cart = [];
  details;
  public responce;
  invalid = false;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.store = this.product.store;
    this.getDetail();
    
  }

  getDetail()
  {
    this.details=JSON.parse(localStorage.getItem('token'));
    this.user=this.details.resp;
    this.cart=this.user.cart;
    if(this.user==null)
    {
      this.invalid=true;
    }
    console.log(this.user);
    this.Price();
  //   console.log(user);
  //   this.product.getUser(user._id)
  //   .subscribe((data) => {this.user=data;this.err=null;this.getCart()},(errr)=> { this.err=errr;this.user=null});
  }


  Price()
  {
    this.totalprice=0;

    for(let i=0;i<this.cart.length;i++)
    {
      this.totalprice=this.totalprice+this.cart[i].price;
    }
    console.log(this.totalprice);
  }



  Order(product)
  {
    alert(`your order ${product.productname} will be delivered in 4 days`);
    this.remove(product);
  }

  remove(k) {
    this.cart=this.cart.filter(x => x._id != k._id);
    const a = k.price;
    this.totalprice-=a;
    const abc= {
      cart: this.cart
    }
    this.product.updateUser(this.user._id,abc)
    .subscribe((data) => {this.responce=data;this.err=null;this.product.updateLocalUser(this.responce.resp);},(errr)=> { this.err=errr;this.user=null});
  }

}
