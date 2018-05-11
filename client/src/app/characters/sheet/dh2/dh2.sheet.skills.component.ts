import {Component, Input} from '@angular/core';

@Component({
  selector: 'rpgi-dh2-sheet-skills',
  templateUrl: './dh2.sheet.skills.component.html',
  styleUrls: []
})
export class Dh2SheetSkillsComponent {
  _sheet: any = false;
  get sheet(): any {
    return this._sheet;
  }

  @Input('sheet')
  set sheet(value: any) {
    this._sheet = value;
    this.initSheet();
  }

  @Input() editMode = false;

  private initSheet() {
    if (!this._sheet.skills) {
      this._sheet.skills = {};
    }
  }
}

@Component({
  selector: 'rpgi-dh2-skill',
  template: `
    <div class="skill row">
      <label class="col-md-7 skill-title">{{skillLabel}}</label>
      <label class="col-md-5 value-label" [ngClass]="{'edit-mode': editMode}">
        <fa-icon [icon]="[skill.level > 0 ? 'fas' : 'far', 'square']" (click)="setLevel(1)"></fa-icon>
        <fa-icon [icon]="[skill.level > 1 ? 'fas' : 'far', 'square']" (click)="setLevel(2)"></fa-icon>
        <fa-icon [icon]="[skill.level > 2 ? 'fas' : 'far', 'square']" (click)="setLevel(3)"></fa-icon>
        <fa-icon [icon]="[skill.level > 3 ? 'fas' : 'far', 'square']" (click)="setLevel(4)"></fa-icon>
        <label *ngIf="!skill.level || skill.level < 1">-20</label>
        <label *ngIf="skill.level === 2">+10</label>
        <label *ngIf="skill.level === 3">+20</label>
        <label *ngIf="skill.level === 4">+30</label>
      </label>
    </div>`,
  styleUrls: ['dh2.sheet.skills.component.scss']
})
export class Dh2SkillComponent {
  @Input() editMode = false;
  @Input() skillName: string;
  @Input() skillLabel: string;
  _sheet: any = false;
  get sheet(): any {
    return this._sheet;
  }

  @Input('sheet')
  set sheet(value: any) {
    this._sheet = value;
    this.initSheet();
  }

  skill: any = null;

  setLevel(level: number) {
    if (this.editMode) {
      if (this.skill.level === level) {
        level--;
      }
      this.skill.level = level;
    }
  }

  initSheet(): void {
    if (!this.sheet.skills[this.skillName]) {
      this.sheet.skills[this.skillName] = {
        level: 0
      };
    }
    this.skill = this.sheet.skills[this.skillName];
  }
}


@Component({
  selector: 'rpgi-dh2-skill-list',
  template: `
    <div class="skill-list">
      <label class="skill-title">{{skillLabel}}</label>
      <div *ngIf="!skill.values || skill.values.length === 0"><label>-</label></div>
      <div class="row skill" *ngFor="let item of skill.values; let i = index; trackBy:trackByIndex;">
        <div class="col-md-7">
          <label *ngIf="!editMode" class="skill-name">{{item.label}}</label>
          <input *ngIf="editMode" [(ngModel)]="skill.values[i].label" class="form-control">
        </div>
        <div class="col-md-5" [ngClass]="{'edit-mode': editMode}">
          <label class="value-label">
            <fa-icon [icon]="[item.level > 0 ? 'fas' : 'far', 'square']" (click)="setLevel(i, 1)"></fa-icon>
            <fa-icon [icon]="[item.level > 1 ? 'fas' : 'far', 'square']" (click)="setLevel(i, 2)"></fa-icon>
            <fa-icon [icon]="[item.level > 2 ? 'fas' : 'far', 'square']" (click)="setLevel(i, 3)"></fa-icon>
            <fa-icon [icon]="[item.level > 3 ? 'fas' : 'far', 'square']" (click)="setLevel(i, 4)"></fa-icon>
            <label *ngIf="!item.level || item.level < 1">-20</label>
            <label *ngIf="item.level === 2">+10</label>
            <label *ngIf="item.level === 3">+20</label>
            <label *ngIf="item.level === 4">+30</label>
          </label>
          <span class="remove" *ngIf="editMode" (click)="remove(i)">
            <fa-icon [icon]="['fas', 'minus-circle']"></fa-icon>
          </span>
        </div>
      </div>
      <button *ngIf="editMode" class="btn btn-primary btn-sm" (click)="add()">Add</button>
    </div>`,
  styleUrls: ['dh2.sheet.skills.component.scss']
})
export class Dh2SkillListComponent {
  @Input() editMode = false;
  @Input() skillName: string;
  @Input() skillLabel: string;
  _sheet: any = false;
  get sheet(): any {
    return this._sheet;
  }

  @Input('sheet')
  set sheet(value: any) {
    this._sheet = value;
    this.initSheet();
  }

  skill: any = null;

  setLevel(index: number, level: number) {
    if (this.editMode) {
      if (this.skill.values[index].level === level) {
        level--;
      }
      this.skill.values[index].level = level;
    }
  }

  initSheet(): void {
    if (!this.sheet.skills[this.skillName]) {
      this.sheet.skills[this.skillName] = {
        values: []
      };
    }
    this.skill = this.sheet.skills[this.skillName];
  }

  add() {
    this.skill.values.push({
      level: 0,
      label: ''
    });
  }

  remove(index) {
    this.skill.values.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
