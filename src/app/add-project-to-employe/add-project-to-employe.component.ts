import {Component, Inject, OnInit} from '@angular/core';
import {ProjectService} from '../service/project.service';
import {Project} from '../modal/Modal';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-project-to-employe',
  templateUrl: './add-project-to-employe.component.html',
  styleUrls: ['./add-project-to-employe.component.css']
})
export class AddProjectToEmployeComponent implements OnInit {
  projects: Project[];
  progressBar = false;

  constructor(private projectService: ProjectService, @Inject(MAT_DIALOG_DATA) public data: any,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => {
        this.projectService.findProjects().subscribe(projects => {
          this.projects = projects;
          this.projectService.findProjectsForEmplopyee(this.data.idEmployee).subscribe(filterProjects => {
            filterProjects.forEach(pro => {
              this.projects = this.projects.filter(p => p.id !== pro.id);
            });
          });
        });
      }
    );
  }

  ngOnInit(): void {

  }

  AddProjectToEmployee(e): void {
    this.projectService.addProjectToEmployee(this.data.idEmployee, e.value).forEach(() => {
      window.location.replace(`/dashbaord`);
    });
  }
}
