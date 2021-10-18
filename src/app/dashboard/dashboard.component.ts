import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import {MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import {ActivatedRoute, Router} from '@angular/router';
import {Company, User} from '../modal/Modal';
import {ApplicationItemFlatNode, ApplicationItemNode, TreeCompanyService} from '../service/tree-company.service';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  company: Company = {} as Company;
  user: User = {} as User;

  flatNodeMap = new Map<ApplicationItemFlatNode, ApplicationItemNode>();
  nestedNodeMap = new Map<ApplicationItemNode, ApplicationItemFlatNode>();

  treeControl: FlatTreeControl<ApplicationItemFlatNode>;
  treeFlattener: MatTreeFlattener<ApplicationItemNode, ApplicationItemFlatNode>;
  dataSource: MatTreeFlatDataSource<ApplicationItemNode, ApplicationItemFlatNode>;
  private expandedNodes: ApplicationItemFlatNode[];

  constructor(private userService: UserService, private route: ActivatedRoute,
              private treeCompanyService: TreeCompanyService) {
    this.treeFlattener = new MatTreeFlattener(this.transform, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ApplicationItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.route.params.subscribe(
      params => {
        this.saveExpandedNodes();
        this.restoreExpandedNodes();
        treeCompanyService.applicationData.subscribe(company => {
          this.dataSource.data = company;
        });
        if (this.user != null) {
          this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
            this.user = user;
          });
        }
        this.treeCompanyService.applicationState.next(this.company);
      });
  }

  ngOnInit(): void {
  }

  getLevel = (node: ApplicationItemFlatNode) => node.level;
  isExpandable = (node: ApplicationItemFlatNode) => node.expandable;
  getChildren = (node: ApplicationItemNode): ApplicationItemNode [] => node.children;
  hasChild = (_: number, nodeDate: ApplicationItemFlatNode) => nodeDate.expandable;
  hasNoContent = (_: number, nodeData: ApplicationItemFlatNode) => nodeData.item === '';

  transform = (node: ApplicationItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name ? existingNode : new ApplicationItemFlatNode();
    flatNode.name = node.name;
    flatNode.id = node.id;
    flatNode.clazz = node.clazz;
    flatNode.level = level;
    flatNode.title = node.title;
    flatNode.routerLink = node.routerLink;
    flatNode.actions = node.actions;
    flatNode.expandable = (node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  private saveExpandedNodes(): void {
    if (this.treeControl && this.treeControl.dataNodes) {
      this.expandedNodes = new Array<ApplicationItemFlatNode>();
      this.treeControl.dataNodes.forEach(node => {
        if (node.expandable && this.treeControl.isExpanded(node)) {
          this.expandedNodes.push(node);
        }
      });
    }
  }

  private restoreExpandedNodes(): void {
    if (this.expandedNodes && this.expandedNodes.length > 0) {
      this.expandedNodes.forEach(node => {
        this.treeControl.expand(this.treeControl.dataNodes.find(n => n.id === node.id));
      });
    }
  }

}
