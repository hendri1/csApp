export interface MenuInterface {
  count: number;
  menu: Array<menu>;
}

export interface menu {
  id: number;
  title: string;
  icon: string;
  link: string;
}