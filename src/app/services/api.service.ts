import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

    postProgram(data : any) {
      return this.http.post<any>("http://localhost:3000/programList/", data);
    }

    getProgram() {
      return this.http.get<any>("http://localhost:3000/programList/");
    }

    putProgram(data: any, id: number) {
      return this.http.put<any>("http://localhost:3000/programList/"+id,data);
    }

    deleteProgram(id: number) {
      return this.http.delete<any>("http://localhost:3000/programList/"+id);
    }
}
