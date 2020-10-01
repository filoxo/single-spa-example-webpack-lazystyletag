import React, { useState } from "react";
import Child from "./child.component";

export default function Root(props) {
  const [showChild, toggleShowChild] = useState(false);

  return (
    <section>
      <p>{props.name} is mounted!</p> Look at the README for a thorough
      explanation.
      <div>
        <button type="button" onClick={() => toggleShowChild(!showChild)}>
          Render a child with more lazy styles
        </button>
      </div>
      <div>{showChild && <Child />}</div>
    </section>
  );
}
