import React from "react";

import cancellationpolicies from "./data/cancellationpolicy.json";

const CancellationPolicy = () => {
  return (
    <ul className="list-disc pl-5">
      {cancellationpolicies.map((item) => (
        <li key={item.id}>{item.description}</li>
      ))}
    </ul>
  );
};

export default CancellationPolicy;
