import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../main/models/Category.model';
import { tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/category';
  categories$ = new Subject<ICategory[]>();
  categories: ICategory[] = [];
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<ICategory[]>(this.baseUrl).pipe(
      tap((categories) => {
        this.categories = categories;
        this.categories$.next(this.categories.slice());
      })
    );
  }
  getCategoriesTitles() {
    return this.http.get<ICategory[]>(this.baseUrl).pipe(
      tap((categories) => {
        this.categories = categories;
        this.categories$.next(this.categories.slice());
      }),
      map((categories) => {
        return categories.map((category) => {
          return category.title;
        });
      })
    );
  }
}
