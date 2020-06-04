import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUtils } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';
import { MediaHubManager } from '../media-hub.manager';

@Component({
  selector: 'app-media-hub-gate',
  templateUrl: './media-hub-gate.component.html',
  styleUrls: ['./media-hub-gate.component.scss'],
  providers: [MediaHubManager, RouteUtility]
})
export class MediaHubGateComponent implements OnInit, OnDestroy {

  constructor(
    private readonly mediaManager: MediaHubManager
  ) { }

  ngOnInit() { }

  ngOnDestroy() {
    AppUtils.unsubscribe(this.mediaManager.subscription);
  }

}
