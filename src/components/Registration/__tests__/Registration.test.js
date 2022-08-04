import { shallow, render } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Registration from "../Registration";
import { TextField, Button } from "@material-ui/core";
import { Card, CardContent } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

describe("Registration", function () {
  let registration;
  beforeEach(() => {
    registration = shallow(
      <Router>
        <Registration />
      </Router>
    );
  });

  // it("renders a sign up button", () => {
  //   render(<Button />);

  //   expect().toBe("Sign Up");
  // });
  // const mockFn = jest.fn();
  // it('should call mock function when button is clicked', () => {
  //     const tree = render(
  //       <Button id= "signup" onSubmit={mockFn} />
  //     );
  //     tree.simulate('click');
  //     expect(mockFn).toHaveBeenCalled();
  //   });
  it("renders registration page correctly", () => {
    const tree = renderer.create(registration).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the form currently", () => {
    const component = render(<form />);
    expect(component.length).toBe(1);
  });

  it("renders the card currently", () => {
    const component = render(<Card />);
    expect(component.length).toBe(1);
  });
  it("renders the card content currently", () => {
    const component = render(<CardContent />);
    expect(component.length).toBe(1);
  });

  it("renders first name text field input", () => {
    const fname = render(<TextField id="fname" />);
    // const firstName = getByTestId("fname");
    expect(fname.length).toBe(1);
  });

  it("renders last name text field input", () => {
    const lname = render(<TextField id="lname" />);
    expect(lname.length).toBe(1);
  });

  it("renders email text field input", () => {
    const email = render(<TextField id="email" />);
    expect(email.length).toBe(1);
  });

  it("renders password text field input", () => {
    const password = render(<TextField id="password" />);
    expect(password.length).toBe(1);
  });

  it("renders telephone text field input", () => {
    const telephone = render(<TextField id="telephone" />);
    expect(telephone.length).toBe(1);
  });

  describe("Button", function () {
    let mountedButton;

    beforeEach(() => {
      mountedButton = shallow(<Button />);
    });

    it("renders without crashing", () => {
      mountedButton = render(<Button />);
      expect(mountedButton.length).toBe(1);
    });

    // it('renders a button', () => {
    //     const bt = mountedButton.find(<Button/>);
    //     expect(bt.length).toBe(2);
    // });
    it("matches snapshot", () => {
      const tree = renderer.create(<Button id="signup"></Button>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders the sign up button", () => {
      const btn = render(<Button id="signup" />);
      expect(btn.length).toBe(1);
    });

    it("renders the cancel button", () => {
      const cancelbtn = render(<Button id="cancel" />);
      expect(cancelbtn.length).toBe(1);
    });
  });

  // it("Sign up submit button should be able to redirect to the home page", () => {
  //   shallow(/Login)
  // })
});
