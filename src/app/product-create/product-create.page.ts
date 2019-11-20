import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {
  data: UserData
  UserID: number;
 
  constructor(
    //public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public apiService: AuthService,
    public router: Router
  ) {
    this.UserID = this.activatedRoute.snapshot.params["id"];
    this.data = new UserData();
    this.data.UserID = this.UserID;
   
     
  
   }

  ngOnInit() {
  }
  AlphaKeyUp(value){
    $('.'+value).val($('.'+value).val().toString().replace(/[^a-zA-Z \n\r\/,]+/g, ''));
  }
  IntKeyUp(value){
    $('.'+value).val($('.'+value).val().toString().replace(/[^0-9\n\r]+/g, ''));
  }
  validation(){
    if($('.validation1').val()==""){
      alert('Product name is Required.');
      $('.validation1').focusout();
    return false;
    }
    if($('.validation2').val()==""){
      alert('price is Required.');
      $('.validation2').focus();
      return false;
    }
    if($('.validation3').val()==""){
      alert('Stock is Required.');
      $('.validation3').focus();
      return false;
    }
    if($('.validation4').val()==""){
      alert('Description is Required.');
      $('.validation4').focus();
      return false;
    }
    if($('.validation5').val()==""){
      alert('Category is Required.');
      $('.validation5').focus();
      return false;
    }
    if($('.validation6').val()==""){
      alert('barcode is Required.');
      $('.validation6').focus();
      return false;
    }
    return true;
  }
  submitForm() {
    if(this.validation()==true){
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['dashboard']);
    });
    
  }
  }

}
