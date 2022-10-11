import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  
  constructor(private http: HttpClient) { }

  uploadFile(title: string, fileToUpload?: File): Observable<File> {
    const formData: FormData = new FormData()
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name)
    }
    formData.append('title', title)

    return this.http.post<any>('http://localhost:8000/api/upload', formData)
  }

  editFile(id: number, title: string, fileToUpload?: File): Observable<File> {
    const formData: FormData = new FormData()
    if (fileToUpload) {
      formData.append('file', fileToUpload, fileToUpload.name)
    }
    formData.append('title', title)

    return this.http.post<any>(`http://localhost:8000/api/file/${id}/update`, formData, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
  }

  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8000/api/get-files')
      .pipe(map(res => Array.from(Object.values(res))), catchError(err => throwError(err)))
  }

  getFile(id: number): Observable<any> {
    return this.http.get(`http://localhost:8000/api/get-file/${id}`)
  }

  deleteFile(id: number): Observable<any> {
    
    return this.http.delete<any>('http://localhost:8000/api/delete/'+id, 
    // {
    //   headers:
    //     new HttpHeaders(
    //       {
    //         'X-CSRF-TOKEN': this.myToken
    //       }
    //     )
    // }
    )
  }

  getToken(): Observable<{token: string}> {
    return this.http.get<{token: string}>('http://localhost:8000/token')
  }

}
