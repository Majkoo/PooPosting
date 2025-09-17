import {MenuItem} from "./menuItem";

export interface SidebarItem {
  label: string;
  class: string;
  showWhileLoggedIn: boolean;
  showWhileLoggedOut: boolean;
  menuItems: MenuItem[];
}
