import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  id: number;
  data: UserData;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: AuthService
  ) { 
    this.data = new UserData();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response[0];
    })
  }
  AlphaKeyUp(value){
    $('.'+value).val($('.'+value).val().toString().replace(/[^a-zA-Z \n\r\/,]+/g, ''));
  }
  IntKeyUp(value){
    $('.'+value).val($('.'+value).val().toString().replace(/[^0-9\n\r]+/g, ''));
  }
  valid(){
    if($('.valid1').val()==""){
      alert('Product name is Required.');
      $('.valid1').focus();
    return false;
    }
    if($('.valid2').val()==""){
      alert('price is Required.');
      $('.valid2').focus();
      return false;
    }
    if($('.valid3').val()==""){
      alert('Stock is Required.');
      $('.valid3').focus();
      return false;
    }
    if($('.valid4').val()==""){
      alert('Description is Required.');
      $('.valid4').focus();
      return false;
    }
    if($('.valid5').val()==""){
      alert('Category is Required.');
      $('.valid5').focus();
      return false;
    }
    if($('.valid6').val()==""){
      alert('barcode is Required.');
      $('.valid6').focus();
      return false;
    }
    return true;
  }

  update() {
    //Update item by taking id and updated data object
    if(this.valid()==true){
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dashboard']);
    })
  }
}

}
