import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from '../main/models/Category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {
  categories!:ICategory[];
  categoriesSubs!:Subscription;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
   this.categoryService.getCategories().subscribe(categories=>{
      this.categories = categories;
   });
    this.categoriesSubs = this.categoryService.categories$.subscribe(categories=>{
      this.categories = categories;
    })
  }

  ngOnDestroy(): void {
    this.categoriesSubs.unsubscribe();
  }

}
