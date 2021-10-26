import React, { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import "./orgchart.css";

const OrgChart = () => {
  const [selection, setSelection] = useState([]);
  const data1 = [
    {
      label: "CEO",
      type: "person",
      className: "p-person",
      expanded: true,
      data: { name: "?????", avatar: "" },
      children: [
        {
          label: "CFO",
          type: "person",
          className: "p-person",
          expanded: true,
          data: { name: "?????", avatar: "" },
          children: [
            {
              label: "Tax",
              className: "department-cfo",
            },
            {
              label: "Legal",
              className: "department-cfo",
            },
          ],
        },
        {
          label: "COO",
          type: "person",
          className: "p-person",
          expanded: true,
          data: { name: "?????", avatar: "" },
          children: [
            {
              label: "Operations",
              className: "department-coo",
            },
          ],
        },
        {
          label: "CTO",
          type: "person",
          className: "p-person",
          expanded: true,
          data: { name: "?????", avatar: "" },
          children: [
            {
              label: "Development Team",
              className: "department-cto",
              expanded: true,
              children: [
                {
                  label: "Full Stack Developer",
                  className: "p-person",
                  type: "person",
                  expanded: true,
                  data: { name: "Eng. Muath Al Nahhas", avatar: "" },
                },
                {
                  label: "Full Stack Developer",
                  className: "p-person",
                  type: "person",
                  expanded: true,
                  data: {
                    name: "Eng. Mohammed Ghazal",
                  },
                },
                {
                  label: "Full Stack Developer",
                  className: "p-person img_team",
                  type: "person",
                  expanded: true,
                  data: { name: "Eng. Ahmed Okasha", avatar: "" },
                },
              ],
            },
            {
              label: "QA",
              className: "department-cto",
            },
            {
              label: "R&D",
              className: "department-cto",
            },
          ],
        },
      ],
    },
  ];

  const nodeTemplate = (node) => {
    if (node.type === "person") {
      return (
        <div>
          <div className="node-header">{node.label}</div>
          <div className="node-content">
            <img
              className={
                node.data.name === "Eng. Mohammed Ghazal" ||
                node.data.name === "Eng. Muath Al Nahhas" ||
                node.data.name === "Eng. Ahmed Okasha"
                  ? `team`
                  : ``
              }
              alt={node.data.avatar}
              src={
                node.data.name === "Eng. Mohammed Ghazal"
                  ? `https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80`
                  : `showcase/demo/images/organization/${node.data.avatar}`
              }
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              // style={{width:node.data.className==="img_team"?"150px":"",height:node.data.className==="img_team"?"200px":""}}
            />

            <div>{node.data.name}</div>
          </div>
        </div>
      );
    }

    if (node.type === "department") {
      return node.label;
    }
  };

  return (
    <div className="organizationchart-demo">
      <div className="card">
        <OrganizationChart
          value={data1}
          nodeTemplate={nodeTemplate}
          selection={selection}
          selectionMode="multiple"
          onSelectionChange={(event) => setSelection(event.data)}
          className="company"
        ></OrganizationChart>
      </div>
    </div>
  );
};

export default OrgChart;
