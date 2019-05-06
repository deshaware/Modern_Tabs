export interface IPivotItemProps {
  icon: string;
  pivotHeader: string;
  listItems: IListItem[];
  itemCount: number;
}

export interface IListItem {
  id: number;
  title: String;
  createdBy: String;
  modified: String;
}
