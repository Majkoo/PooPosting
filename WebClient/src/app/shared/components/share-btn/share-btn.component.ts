import { ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureDto } from "../../utility/dtos/PictureDto";
import { environment } from 'src/environments/environment';
import { DialogModule } from "primeng/dialog";

interface ShareOption {
  website: string;
  link: string;
  icon: string;
  color: string;
}

@Component({
    selector: 'pp-share-btn',
    standalone: true,
    imports: [CommonModule, DialogModule],
    templateUrl: './share-btn.component.html'
})
export class ShareBtnComponent {
  @Input() cssClass?: string;
  @Input({required: true}) pic!: PictureDto;
  @Output() picChange: EventEmitter<PictureDto> = new EventEmitter<PictureDto>();
  @ViewChild('scrollCont') input: ElementRef<HTMLDivElement> | undefined;

  // to add new share, add it to this list (used in share() and 8th line in html file)
  shareOptions: ShareOption[] = [
    {website: "Copy", link: "", color: "text-gray-400", icon: "icon-link"},
    {website: "Telegram", link: "https://t.me/share/url?url={picUrl}&text=Checkout this cool image on PooPosting!", color: "text-blue-400", icon: "icon-telegram"},
    {website: "Twitter/X", link: "https://twitter.com/intent/tweet?url={picUrl}&text=Checkout this cool image on PooPosting!", color: "text-gray-600", icon: "icon-twitter"},
    {website: "Facebook", link: "https://www.facebook.com/sharer/sharer.php?u={picUrl}", color: "text-blue-600", icon: "icon-facebook"},
    {website: "E-mail", link: "mailto:?subject=Cool Picture!&body=Checkout this cool image on PooPosting {picUrl}", color: "text-red-500", icon: "icon-mail"},
  ]

  dialogVisible: boolean = false;
  scrollLeft = 0;

  openDialog() {
    this.dialogVisible = true;
  }
  
  closeDialog(option?: string): void {
    this.dialogVisible = false;
    this.scrollLeft = 0;
    if (option != null) {
      this.share(option);
    }
  }

  onScroll(event) {
    this.scrollLeft = (event.target as HTMLElement).scrollLeft;
  }

  share(link: string){
    const picUrl = `${environment.appWebUrl}/?picture=${this.pic.id}`
    if (link != ""){
      window.open(link.replace("{picUrl}", picUrl))
    }
    else{
      navigator.clipboard.writeText(picUrl);
    }
  }
}