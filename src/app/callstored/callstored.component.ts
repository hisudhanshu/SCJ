import { Component, OnInit } from '@angular/core';
import { CallstoredService } from '../callstored.service'; 

@Component({
  selector: 'app-callstored',
  templateUrl: './callstored.component.html',
  styleUrls: ['./callstored.component.css']
})
export class CallstoredComponent implements OnInit {

  constructor(private callstoredService: CallstoredService) { }
  callStoredProcedure() {
    this.callstoredService.callStoredProcedure()
      .subscribe((response) => {
        // Handle the response from the stored procedure here
        console.log(response);
      });
  }

  ngOnInit(): void {
  }

}
