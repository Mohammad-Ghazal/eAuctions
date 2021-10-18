import React from "react";
import { PanelMenu } from "primereact/panelmenu";
import { Link } from "react-router-dom";
import "../panelMenu/PanelMenu.css";
const PanelMenuDemo = () => {
  const items = [
    {
      label: "Auction",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: (
            <Link
              to="/CreateAuction"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Auction
            </Link>
          ),
          icon: "pi pi-fw pi-plus",
        },
        {
          label: (
            <Link
              to="/MyAuction"
              style={{ textDecoration: "none", color: "white" }}
            >
              My Auction
            </Link>
          ),
          icon: "pi pi-shopping-cart",
        },
        {
          label: (
            <Link
              to="/AllAuctions"
              style={{ textDecoration: "none", color: "white" }}
            >
              All Auction
            </Link>
          ),
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Item",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: (
            <Link
              to="/CreateItem"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Item
            </Link>
          ),
          icon: "pi pi-fw pi-plus",
        },
        {
          label: (
            <Link
              to="/MyItem"
              style={{ textDecoration: "none", color: "white" }}
            >
              My Item
            </Link>
          ),
          icon: "pi pi-shopping-cart",
        },
        {
          label: (
            <Link
              to="/AllItem"
              style={{ textDecoration: "none", color: "white" }}
            >
              All Item
            </Link>
          ),
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <div>
        <PanelMenu
          model={items}
          style={{ width: "23rem" }}
          className="p-submenu-list"
        />
      </div>
    </div>
  );
};
export default PanelMenuDemo;
