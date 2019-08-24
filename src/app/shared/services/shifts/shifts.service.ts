import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@core/constants';
import { ListEntityRes } from '@shared/models';
import { ShiftsModel } from './shift.model';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(
    private http: HttpClient
  ) { }

  getShifts() {
    return this.http.get<ListEntityRes<ShiftsModel.IShift>>(`${Constants.API.Shifts}`);
  }
}
