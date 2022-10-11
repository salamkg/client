import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000';

  uploadFile(title: string, fileToUpload?: File): Observable<File> {
    const formData: FormData = new FormData()
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name)
    }
    formData.append('title', title)

    return this.http.post<any>(`${this.baseUrl}/api/upload`, formData)
  }

  editFile(id: number, title: string, fileToUpload?: File): Observable<File> {
    const formData: FormData = new FormData()
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name)
    }
    formData.append('title', title)

    return this.http.post<any>(`${this.baseUrl}/api/file/${id}/update`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/get-files`)
      .pipe(map(res => Array.from(Object.values(res))), catchError(err => throwError(err)))
  }

  getFile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/get-file/${id}`)
  }

  deleteFile(id: number): Observable<any> {
    
    return this.http.delete<any>(`${this.baseUrl}/api/delete/${id}`, )
  }

  // getToken(): Observable<{token: string}> {
  //   return this.http.get<{token: string}>('http://localhost:8000/token')
  // }

}
