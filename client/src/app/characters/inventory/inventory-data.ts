
export class InventoryElement {
  public id: number;
  public label: string;
  public categories: InventoryElement[];
  public items: InventoryItem[];
}

export class InventoryItem extends InventoryElement {
  public weight: number;
  public comments: string;
  public reference: string;
  public count: number;
}

