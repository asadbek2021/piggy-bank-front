import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from '../main/models/Transactions.model';

@Pipe({
  name: 'transactionSelect'
})
export class TransactionSelectPipe implements PipeTransform {

  transform(value: any, type:string) {
    let result = [];
    if(value && type){

      for(const item of value){
        if(item.type === type){
          result.push(item)
        }
      }
      return result;
    }
    else{

      return value;
    }
  }

}
