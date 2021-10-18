import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {AddProjectToDeprtmentComponent} from '../add-project-to-deprtment/add-project-to-deprtment.component';
import {Project} from '../modal/Modal';
import {ProjectService} from '../service/project.service';

@Component({
  selector: 'app-display-project-employee',
  templateUrl: './display-project-employee.component.html',
  styleUrls: ['./display-project-employee.component.css']
})
export class DisplayProjectEmployeeComponent implements OnInit {
  project: Project = {} as Project;
  id: number;

  constructor(private projectService: ProjectService, private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.route.params.subscribe(
      params => {
        this.id = this.route.snapshot.params.id;
        this.projectService.findProject(this.id).subscribe(project => {
          this.project = project;
        });
      }
    );
  }

  ngOnInit(): void {

  }

  deleteProject(id): void {
    if (confirm('Are you sure')) {
      this.projectService.deleteProejct(id).subscribe(() => {
        window.location.replace(`/dashbaord`);
      });
    }
  }

  editProject(idProject): void {
    this.dialog.open(AddProjectToDeprtmentComponent, {
      data: {idProject},
      height: '480px',
      width: '400px',
    });
  }

}
