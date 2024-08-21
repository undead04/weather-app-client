import * as React from "react";
import { useState } from "react";
interface Prop {
  component: {
    lable: string;
    link: string;
    current: number;
  }[];
  currentTab: number;
}
const TabReact: React.FC<Prop> = ({ component, currentTab }) => {
  return (
    <>
      <ul className="nav nav-underline">
        {component.map((item, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link text-black ${
                item.current === currentTab && "active"
              }`}
              aria-current="page"
              href={item.link}
            >
              {item.lable}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TabReact;
