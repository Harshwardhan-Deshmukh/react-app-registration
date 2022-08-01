import Home from "../Home";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Home />);
});

describe("Home", function () {
  let home;
  beforeEach(() => {
    home = shallow(<Home />);
  });

  it("renders a div", () => {
    const divElement = home.find("div");
    expect(divElement.length).toBe(1);
  });
});
