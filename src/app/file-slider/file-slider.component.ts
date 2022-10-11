import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { MaterialService } from '../shared/flash-message/material.service';

@Component({
  selector: 'app-file-slider',
  templateUrl: './file-slider.component.html',
})
export class FileSliderComponent implements AfterViewInit {

  @ViewChild('carousel') carouselRef: ElementRef
  @Input() filesToSlider: [];

  allFiles: any
  items: any[] = []
  hrefs: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.filesToSlider.forEach(file => {
      this.items.push(file['title'])
      this.hrefs.push(file['id'])
    })
  }

  ngAfterViewInit(): void {
      MaterialService.initSlider(this.carouselRef)
  }

}
