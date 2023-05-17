import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  http: any;

  public connectServer() {
    this.http.get('url')
      .subscribe(
        (        data: any) => console.log(data),
        (        err: any) => console.log(err)
      );
  }
  
  title = 'admindashboard';
  constructor(private elementRef: ElementRef,  public  _router: Router , http: HttpClient) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
