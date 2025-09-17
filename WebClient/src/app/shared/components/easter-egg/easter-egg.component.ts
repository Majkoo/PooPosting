import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'pp-easter-egg',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.scss']
})
export class EasterEggComponent implements AfterViewInit {
  @Input() playEasterEgg: boolean = false;
  showingAnimation : boolean = false
  dot = {display: "none", left: "2px", top: "3px"}

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(){
    if (Math.random()*1000 == 693){
      this.showEasterEgg()
    }
  }
  ngOnChanges(){
    if(this.playEasterEgg){
      this.clickedEgg()
    }
  }

  showEasterEgg(){
    this.dot.display = "block"
    this.dot.left = Math.floor(Math.random() * window.innerWidth).toString() + "px"
    this.dot.top =  Math.floor(Math.random() * window.innerHeight).toString() + "px"
    this.cdr.detectChanges();
  }
  
  clickedEgg(){
    this.dot.display = "none"
    this.cdr.detectChanges();
    setTimeout(() => {
      this.showingAnimation = true
      this.cdr.detectChanges();
      let audio = new Audio();
      audio.src = "/assets/sounds/nerdSong.mp3";
      audio.load();
      audio.play();
      setTimeout(() => {
        this.showingAnimation = false
      }, 6000);
    }, 3000);
  }
}
