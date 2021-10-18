import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Process, Project} from '../modal/Modal';
import {ProjectService} from '../service/project.service';

@Component({
  selector: 'app-add-project-to-deprtment',
  templateUrl: './add-project-to-deprtment.component.html',
  styleUrls: ['./add-project-to-deprtment.component.css']
})
export class AddProjectToDeprtmentComponent implements OnInit {
  project: Project = {} as Project;
  progressBar = false;
  process: any = {};

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private projectService: ProjectService) {
  }

  ngOnInit(): void {
    if (this.data.idProject != null) {
      this.projectService.findProject(this.data.idProject).subscribe(project => {
        this.project = project;
      });
    }
  }

  setProcess(e): void {
    this.process = e;
  }

  addProject(): void {
    this.progressBar = true;
    this.project.process = this.process;
    if (this.data.idProject != null) {
      this.projectService.editProject(this.project, this.data.idProject).subscribe(project => {
        this.project = project;
        window.location.reload();
      });
    } else {
      this.projectService.addProjectToDeprtment(this.project, this.data.idDepartment).subscribe(project => {
        this.project = project;
        window.location.reload();
      });
    }
  }
}
