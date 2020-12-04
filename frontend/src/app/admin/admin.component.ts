import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  owner;
  productname="";
  price;
  quantity;
  image;
  user;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    const details=JSON.parse(localStorage.getItem('token'));
    this.user=details.resp;
    this.owner=this.user.name;
    if(this.user.name!="test")
    {
      this.router.navigate(['/']);
    }
  }

  submit()
  {
    if(this.productname==null || this.price==null || this.image == null)
    {
      alert('please fill all the details!');
    }
    else
    {
      const object = {
        position: this.image,
        name: this.productname,
        price: this.price,
      }
  
      this.product.postProduct(object)
      .subscribe((data) => {console.log(data);this.router.navigate(['/'])});
    }
  }

}
