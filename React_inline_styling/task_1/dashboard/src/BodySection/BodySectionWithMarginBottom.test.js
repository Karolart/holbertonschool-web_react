import { shallow } from "enzyme";
import React from "react";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import { StyleSheetTestUtils } from "aphrodite";

describe("<BodySectionWithMarginBottom />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<BodySectionWithMarginBottom />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("renders the BodySection component correctly and passes props to the child component", () => {
    const title = "test title";
    const childrenNode = <p>test children node</p>;

    const wrapper = shallow(
      <BodySectionWithMarginBottom title={title}>
        {childrenNode}
      </BodySectionWithMarginBottom>
    );

    const bodySectionWrapper = wrapper.find("BodySection");

    expect(bodySectionWrapper).toHaveLength(1);
    expect(bodySectionWrapper.prop("title")).toEqual(title);

    const internalBody = bodySectionWrapper.dive();

    const h2 = internalBody.find("h2");
    const p = internalBody.find("p");

    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual(title);

    expect(p).toHaveLength(1);
    expect(p.text()).toEqual("test children node");
  });
});
