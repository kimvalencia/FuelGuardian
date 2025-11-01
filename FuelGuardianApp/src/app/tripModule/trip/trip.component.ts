import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ITrip } from '../../models/ITrip';
import { TripService } from '../../services/trip.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FuelUsagesApiService } from '../../services/api/FuelUsages/fuel-usages-api-service';

@Component({
    selector: 'app-trip',
    templateUrl: './trip.component.html',
    styleUrl: './trip.component.scss',
    standalone: false
})
export class TripComponent implements OnInit {

  private http = inject(FuelUsagesApiService);

  public isVisible:boolean = false;
  public fuelUsages:ITrip[]=[];
  public selectedTrip:ITrip | undefined;

  constructor(private tripService:TripService, private modal:NzModalService, private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.refreshData();
  }

  public refreshData(){
    //this.fuelUsages= [...this.tripService.trips];

    this.http.getAll()
    .subscribe({
      next : (data) => 
        {
          console.log('Fetched fuelusages', data);
          this.fuelUsages = [...data];
          this.cd.detectChanges();
      },
      error: (error) => {console.error('Error fetching fuelusages', error);}
    });

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
      console.log('Trip added/updated successfully');
      this.closeModal();
      setTimeout(() => {
        this.refreshData();
      }, 1000);
      
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
        this.http.delete(id).subscribe({
          next: () => {
            console.log('Trip deleted successfully');
            this.refreshData();
          },
          error: (error) => {
            console.error('Error deleting trip', error);
          }
        });
        //this._deleteTrip(id);
      },
      nzOkText:'Delete',
      nzOkDanger:true,
      nzIconType:'delete'
    })
  }

  public trackById(index:number, item:ITrip):number {
    return item?.id ?? index;
  }

  private _deleteTrip(id:number):void {
    this.tripService.deleteTrip(id);
    this.refreshData();
  }
}
