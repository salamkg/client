import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MaterialService } from '../flash-message/material.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef<any>
  @Output() update: EventEmitter<any> = new EventEmitter<any>()

  form: FormGroup
  file: File

  @Input() fileToModal: any;
  @Output() closeModal = new EventEmitter<any>()
  @Output() refresh = new EventEmitter<any>()
  showModal = false;

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(),
      file: new FormControl()
    })

    this.form.patchValue({
      title: this.fileToModal.title,
      file: this.fileToModal.file
    })
  }

  onClose() {
    this.closeModal.emit(this.showModal)
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.file = file
  }

  onSubmit() {
    this.form.disable()
    this.fileUploadService.editFile(this.fileToModal.id, this.form.value.title, this.file).subscribe(
      response => {
        this.closeModal.emit(this.showModal)
        this.refresh.emit('refresh')
        MaterialService.toast('Successfully updated!')
      },
      err => err
    )
  }
}
