import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {InventoryItem} from "./inventory-data";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'rpgi-inventory-item-edit',
  templateUrl: './character.inventory-item-edit.component.html',
  styleUrls: ['character.inventory.scss']
})
export class CharacterInventoryItemEditComponent implements OnInit {
  @Input()
  item: InventoryItem;
  editedItem: InventoryItem = null;

  itemForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    this.editedItem = {... this.item};
    this.itemForm = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      comments: new FormControl('', []),
      count: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      weight: new FormControl('', []),
      reference: new FormControl('', [])
    });
  }
}
