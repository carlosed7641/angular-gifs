import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card-item',
  templateUrl: './card-item.component.html',
})
export class CardItemComponent implements OnInit {

  @Input()
  gif: Gif = {} as Gif

  ngOnInit(): void {
   if(!this.gif) throw new Error('Gif property is required')
  }

}
