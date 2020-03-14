import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-hub-header',
  templateUrl: './media-hub-header.component.html',
  styleUrls: ['./media-hub-header.component.scss']
})
export class MediaHubHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchForFiles(name: string) {
    // if (AppUtils.isFalsy(name)) {
    //   this.users = this.tempUsers;
    // } else {
    //   this.usersService.searchForUsers(name)
    //     .subscribe((users) => {
    //       this.users = users;
    //     });
    // }
  }

}
