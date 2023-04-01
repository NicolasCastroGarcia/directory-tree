import { useState } from "react";

import "./App.css";

type TNode = {
  name: string;
  children?: TNode[];
};

const tree = [
  {
    name: "node_modules",
    children: [
      { name: "react" },
      {
        name: "react-dom",
        children: [
          {
            name: "react-dom/client"
          }
        ]
      }
    ]
  },
  {
    name: "src",
    children: [{ name: "App.tsx" }, { name: "index.css" }, { name: "main.tsx" }]
  }
];

const PADDING = 20;

function Node({ node, depth }: { node: TNode; depth: number }) {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!isOpen);

  return (
    <ul className="list">
      {node.children && (
        <li>
          <button
            onClick={toggle}
            style={{ paddingLeft: `${depth * PADDING}px` }}
          >
            {isOpen ? "-" : "+"} {node.name}
          </button>
          {isOpen &&
            node.children.map((child) => (
              <Node node={child} depth={depth + 1} />
            ))}
        </li>
      )}

      {!node.children && (
        <li style={{ paddingLeft: `${depth * PADDING}px` }}>{node.name}</li>
      )}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Tree</h1>
      {tree.map((node) => (
        <Node node={node} depth={0} />
      ))}
    </div>
  );
}

export default App;
