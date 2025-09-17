import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDto } from '../../utility/dtos/AccountDto';
import { PagedResult } from '../../utility/dtos/PagedResult';
import { AccountService } from 'src/app/services/api/account/account.service';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pp-account-table',
  templateUrl: './account-table.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AccountTableComponent {
  
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  PageData: PagedResult<AccountDto> = {
    items: [],
    totalPages: 0,
    totalItems: 0,
    pageSize: 5,
    page: 1
  }
  
  private mapPropertyNamesToDisplayNames: { [key: string]: string } = {
    'Role': 'roleId',
    'User': 'nickname',
    '# of posts': 'pictureCount',
    'Date of join': 'accountCreated'
  };

  sortBy: string = "Date of join"
  sortDirection: string = "desc"
  searchPhrase: string = ""

  @Output() selectedItems = new EventEmitter<string[]>();
  checkTopBox : boolean = false
  checkedBoxes: string[] = []
  
  private accountService = inject(AccountService);

  refresh(){
    this.clearChecks()
    this.changePage(this.PageData.page)
    this.selectedItems.emit(this.checkedBoxes);
  }

  ngOnInit(){
    this.changePage(1)
  }

  changePage(page: number){
    this.accountService.getAccountsPaginated(this.PageData.pageSize, page, this.mapPropertyNamesToDisplayNames[this.sortBy], this.sortDirection, this.searchPhrase).pipe(
      tap((list: PagedResult<AccountDto>) => (this.PageData = list, 
        this.PageData.items.forEach(entry => entry.accountCreated = entry.accountCreated.split("T")[0]), 
        this.PageData.totalPages === 0 || this.PageData.page <= this.PageData.totalPages ? this.cdr.detectChanges() : this.changePage(1))),
      catchError(() => this.router.navigate([""], {queryParams: null}))
    )
    .subscribe();
  }

  changePageSize(event : Event){
    let option = event.target as HTMLSelectElement
    this.PageData.pageSize = parseInt(option.value)
    this.changePage(this.PageData.page)
    this.clearChecks()
  }

  checkEntry(id : string){
    let index = this.checkedBoxes.indexOf(id)
    index == -1 ? this.checkedBoxes.push(id) : this.checkedBoxes.splice(index, 1)
    this.checkTopBox = this.checkedBoxes.length == this.PageData.pageSize;
    this.selectedItems.emit(this.checkedBoxes);
  }

  checkEverything(check : boolean){
    this.checkedBoxes = []
    if(check){
      this.PageData.items.forEach(item => {
        this.checkedBoxes.push(item.id)
      })
    }
    this.selectedItems.emit(this.checkedBoxes);
  }

  clearChecks(){
    this.checkedBoxes = []
    this.checkTopBox = false
  }

  changeDirection(){
    this.sortDirection == "desc" ? this.sortDirection = "asc" : this.sortDirection = "desc"
    this.changePage(this.PageData.page)
  }

  changeSearchPhrase(event){
    this.searchPhrase = event.target!.value
    this.changePage(this.PageData.page)
  }
}
