import { Component, Input, OnInit, input } from '@angular/core'

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  url!: string

  @Input()
  alt: string = ''

  hasLoaded: boolean = false

  ngOnInit(): void {
    if (!this.url) throw new Error('url is required')
  }

  onLoad() {
    this.hasLoaded = true
  }
}
