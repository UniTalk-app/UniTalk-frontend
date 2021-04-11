import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Forms from "../Forms";

describe("<Forms />", () => {
  it("Renders <Forms /> component correctly", () => {
    render(<Forms />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

});
