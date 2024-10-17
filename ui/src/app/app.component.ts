import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DriveLog } from '@prisma/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  logs: DriveLog[] = [];
  newLog: DriveLog = <DriveLog>{};

  constructor(private http: HttpClient) {
    this.getAll();
  }

  getAll() {
    this.http.get<DriveLog[]>('api/logs').subscribe((l) => (this.logs = l));
  }

  edit(log: DriveLog) {
    this.newLog = log;
    this.newLog.timestamp = new Date(log.timestamp);
  }

  save() {
    this.http.post('api/logs', this.newLog).subscribe(() => this.getAll());
    this.newLog = <DriveLog>{};
  }

  deleteLog(id: number) {
    this.http.delete(`api/logs/${id}`).subscribe(() => this.getAll());
  }
}
