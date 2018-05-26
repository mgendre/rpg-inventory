import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'rpgi-media-image',
  template: `
    <div class="media-image">
      <div class="image" 
           *ngIf="mediaId" 
           [ngStyle]="{
              'background-image': 'url(\\'/api/v1/media/' + mediaId + '/data\\')',
              'background-size': backgroundSize
           }">
      </div>
    </div>
  `,
  styleUrls: ['./media-image.component.scss']
})
export class MediaImageComponent implements OnInit{

  @Input() mediaId: number;
  @Input() mode: String;

  backgroundSize = 'cover';

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.backgroundSize = 'cover';
    if (this.mode === 'fit') {
      this.backgroundSize = 'contain';
    }
  }
}
