
export class InventoryElement {
  public id: number;
  public label: string;
  public categories: InventoryElement[];
  public items: InventoryItem[];
  public totalWeight: number;
}

export class InventoryItem extends InventoryElement {
  public weight: number;
  public comments: string;
  public reference: string;
  public count: number;
}

