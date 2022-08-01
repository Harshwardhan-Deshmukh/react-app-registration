import HelloWorld from "../HelloWorld";
// import "jest-dom/extend-expect";
import { shallow } from "enzyme";

describe("HelloWorld", function () {
  let helloWorld;
  beforeEach(() => {
    helloWorld = shallow(<HelloWorld />);
  });

  it("displays the welcome message", () => {
    const message = helloWorld.find(".helloContainer");
    expect(message.text()).toEqual("Hello from PSTravels");
  });
});
