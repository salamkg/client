import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../shared/flash-message/material.service';
import { ModalComponent } from '../shared/modal/modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef<any>

  form: FormGroup
  file: File
  showModal: any;
  sub$: Subscription
  fileData: any;
  fileToEdit: any
  classDn: string = 'dn'

  constructor(
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    public modal: ModalComponent
  )
  { }

  files$: any[] = [];
  data$: Observable<any>
  onSubmit$: any;

  ngOnInit()
  {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
    })

    this.getFiles()
    this.getFilesForSlider()
  }

  onCloseModal(close: boolean) {
    this.showModal = close;
  }
  
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.file = file
    this.onSubmit()
  }

  onSubmit() {
    this.form.disable()
    this.sub$ = this.fileUploadService.uploadFile(this.form.value.title || this.file, this.file).subscribe(
      response => {
        MaterialService.toast('Successfully uploaded')
        this.form.enable()
        setTimeout(() => {
          this.ngOnInit()
        }, 2000)
      },
      err => {
        console.log(err)
        MaterialService.toast('Something wrong')
        this.form.enable()
      }
    )
  }

  openModal(file: any) {
    this.showModal = true
    this.fileToEdit = file
  }

  onEdit(file: any) {
    this.fileToEdit = file
    this.showModal = true
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete file?')) {
      this.fileUploadService.deleteFile(id).subscribe(
        response => {
          setTimeout(() => {
            MaterialService.toast('Successfully deleted')
            this.ngOnInit()
          }, 2000)
          
        },
        err => {
          console.log(err)
          MaterialService.toast('Something wrong')
        }
      )
    }
  }
  
  getFiles() {
    this.data$ = this.fileUploadService.getFiles()
  }

  getFilesForSlider() {
    this.fileUploadService.getFiles().subscribe(
      files => { 
        this.files$ = files
      }
    )
  }

  ngOnDestroy(): void {
      if(this.sub$) {
        this.sub$.unsubscribe()
      }
  }

}
