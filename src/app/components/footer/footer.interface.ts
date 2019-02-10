export interface MenuInterface {
  count: number;
  menu: Array<menu>;
}

export interface menu {
  id: number;
  active_class: Array<string>;
  icon: string;
  link: string;
}