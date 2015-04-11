import Main from '../../../src/components/main/Main.jsx';
import { React, TestUtils, fixtures, testdom } from '../../react-helpers';

describe("Main", () => {
  let element;

  beforeEach(() => {
    testdom('<html><body></body></html>');

    let { collection } = fixtures.viewModel;
    let container = TestUtils.renderIntoDocument(
      <Main collection={ collection } />
    );

    element = React.findDOMNode(container);
  });


  it("renders the container", () => {
    expect(element.className).to.equal('layout-main');
  });

  it("renders the cards area", () => {
    let sidebar = element.querySelectorAll('.cards');
    expect(sidebar.length).to.equal(1);
  });

  it.skip("renders the timeline area", () => {
    let sidebar = element.querySelectorAll('.timeline');
    expect(sidebar.length).to.equal(1);
  });
});
