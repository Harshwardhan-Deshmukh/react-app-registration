import { shallow, render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import EmailValidation from "../EmailValidation";
import { Button } from "@material-ui/core";
import { Card, Typography, CardContent, CardActions } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

describe("EmailValidation", function () {
  let emailvalidation;
  beforeEach(() => {
    emailvalidation = shallow(
      <Router>
        <EmailValidation />
      </Router>
    );
  });

  it("renders email verification correctly", () => {
    const tree = renderer.create(emailvalidation).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the card correctly", () => {
    const component = render(<Card />);
    expect(component.length).toBe(1);
  });
  it("renders the card content correctly", () => {
    const component = render(<CardContent />);
    expect(component.length).toBe(1);
  });

  it("renders the typography tag correctly", () => {
    const component = render(<Typography />);
    expect(component.length).toBe(1);
  });

  it("renders the card actions tag correctly", () => {
    const component = render(<CardActions />);
    expect(component.length).toBe(1);
  });

  describe("Button", function () {
    let mountedButton;

    it("renders without crashing", () => {
      mountedButton = render(<Button />);
      expect(mountedButton.length).toBe(1);
    });

    it("matches snapshot", () => {
      const tree = renderer.create(<Button id="proceed"></Button>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders the proceed button", () => {
      const btn = render(<Button id="proceed" />);
      expect(btn.length).toBe(1);
    });
  });
});
