import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  programForm !: FormGroup
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder, 
      private api : ApiService,
      @Inject(MAT_DIALOG_DATA) public editData : any,
      private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.programForm = this.formBuilder.group({
      programName : ['',Validators.required],
      description : ['',Validators.required],
      status : ['',Validators.required]
    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.programForm.controls['programName'].setValue(this.editData.programName);
      this.programForm.controls['description'].setValue(this.editData.description);
      this.programForm.controls['status'].setValue(this.editData.status);
    }

    }

    addProgram() {
      if (!this.editData) {
        if (this.programForm.valid) {
          this.api.postProgram(this.programForm.value)
          .subscribe({
            next: (res) => {
              alert("Program added successfully!");
              this.programForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the Product");
            }
          })
        }
      }
      else {
        this.updateProgram()
      }
    }

    updateProgram() {
      this.api.putProgram(this.programForm.value, this.editData.id)
        .subscribe({
          next:(res) => {
            alert("Program updated successfully!");
            this.programForm.reset();
            this.dialogRef.close('update');
          },
          error:() => {
            alert("Error while updating the record!");
          }
        })
    }
}
