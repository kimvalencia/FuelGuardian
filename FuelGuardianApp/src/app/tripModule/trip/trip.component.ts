import { Component, OnInit } from '@angular/core';
import { ITrip } from '../../models/ITrip';
import { TripService } from '../../services/trip.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {

  public isVisible:boolean = false;
  public fuelUsages:ITrip[]=[];
  public selectedTrip:ITrip | undefined;

  constructor(private tripService:TripService, private modal:NzModalService){}

  ngOnInit(): void {
    this.refreshData();
  }

  private refreshData(){
    this.fuelUsages= [...this.tripService.trips];
  }

  computeFuelBurned(distance:number, consumptionRate:number):number {
    return distance / consumptionRate;
  }

  showAddTripModal():void {
    this.isVisible=true;
  }

  public closeModal():void{
    this.isVisible=false;
    this.selectedTrip =undefined;
  }

  public onSuccessAdd(result:boolean):void{
    if(result){
      this.closeModal();
      this.refreshData();
    }
  }

  public editTrip(trip:ITrip):void {
    console.log(trip);
    this.selectedTrip=trip;
    this.showAddTripModal();
  }

  public deleteTrip(id:number):void {
    this.modal.confirm({
      nzTitle: 'Delete Trip',
      nzContent: 'Are you sure to delete this trip?',
      nzOnOk:()=>{
        this._deleteTrip(id);
      },
      nzOkText:'Delete',
      nzOkDanger:true,
      nzIconType:'delete'
    })
  }

  private _deleteTrip(id:number):void {
    this.tripService.deleteTrip(id);
    this.refreshData();
  }
}
