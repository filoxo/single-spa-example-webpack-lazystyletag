import React, { useEffect } from "react";
import styles from "./child.lazy.css";

export default function ChildComponent() {
  useEffect(() => {
    styles.use();
    return () => {
      styles.unuse();
    };
  }, []);

  return <p>this child has lazy styles too.</p>;
}
