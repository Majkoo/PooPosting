import {ChangeDetectorRef, Component, EventEmitter, inject, Inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetailsData } from '../../../views/add-post/models/postDetailsData';
import { TagComponent } from "src/app/shared/components/tag/tag.component";
import { FormsModule } from '@angular/forms';
import { AccountService } from 'src/app/services/api/account/account.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'pp-tag-input',
  template: `
      <div class="flex flex-wrap gap-2 border-2 px-sm py-xs rounded-lg bg-white">
        <pp-tag *ngFor="let tag of tags; let i = index" [tag]="tag" [removable]="true" (removed)="removeTag(i)"/>
        <input
          type="text"
          class="flex-1 outline-none"
          placeholder="Add tag..."
          [(ngModel)]="currentTag"
          name="tagsInput"
          (keydown.backspace)="this.currentTag == '' ? removeTag(this.tags.length-1) : ''"
          (keydown.space)="addTag()"
          (keydown.enter)="addTag(); $event.preventDefault()"
          (keydown)="this.tags.length == 4 ? $event.preventDefault() : ''"
        />
      </div>
    `,
  standalone: true,
  imports: [CommonModule, TagComponent, FormsModule],
})
export class TagInputComponent implements OnInit {
  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef)
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();
  currentTag = '';
  postDetailsTemp: Partial<PostDetailsData> = {};

  ngOnInit(): void {
    this.accountService.getSetTags().pipe(
      tap((tags) => {this.tags = tags; this.cdr.detectChanges()}
    ))
    .subscribe();
  }

  addTag() {
    const value = this.currentTag.trim();
    if (value && this.tags.length < 4) {
      this.tags.push(value.substring(0, 25));
      this.currentTag = '';
      this.syncTags();
    }
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.syncTags();
  }

  private syncTags() {
    this.tagsChange.emit([...this.tags])
  }
}
