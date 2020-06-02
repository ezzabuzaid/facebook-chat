import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';

@Component({
  selector: 'app-media-hub-gate',
  templateUrl: './media-hub-gate.component.html',
  styleUrls: ['./media-hub-gate.component.scss'],
  providers: [MediaHubManager, RouteUtility]
})
export class MediaHubGateComponent implements OnInit, OnDestroy {
  EmediaHubViews = MediaHubViews;
  currentView = MediaHubViews.GridView;

  constructor(
    private readonly mediaManager: MediaHubManager
  ) { }

  ngOnInit() { }

  changeView(view: MediaHubViews) {
    this.currentView = view;
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.mediaManager.subscription);
  }

}
