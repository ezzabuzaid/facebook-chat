import { Component, OnInit, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FlipCardFabDirective } from '../flip-card-fab.directive';

@Component({
  selector: 'app-flip-card-fab',
  templateUrl: './flip-card-fab.component.html',
  styleUrls: ['./flip-card-fab.component.scss']
})
export class FlipCardFabComponent implements OnInit {
  @Input() component: FlipCardFabDirective;
  createCard = false;
  constructor() { }

  ngOnInit() { }

  addCard() {
    this.createCard = !this.createCard;
    this.component.addCard();
  }

}
