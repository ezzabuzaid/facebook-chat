import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaModel } from '@shared/models';
import { MediaHubManager, MediaHubViews } from '../media-hub.manager';
import { AppUtils } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';

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
    private mediaManager: MediaHubManager
  ) { }

  ngOnInit() { }

  changeView(view: MediaHubViews) {
    this.currentView = view;
  }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.mediaManager.subscription);
  }

}
