import CardNav from '../../../src/components/cards/CardNav.jsx';
import Actions from '../../../src/actions/index.js';
import { React, TestUtils, fixtures, testdom } from '../../react-helpers';

describe("CardNav", () => {
  let element;
  let exploreButton;
  let selection;

  beforeEach(() => {
    testdom('<html><body></body></html>');
    selection = { id: 1, type: 'Waypoint' };
    [element, exploreButton] = renderButtons(selection);
  });

  describe("render", () => {

    it("renders the container", () => {
      expect(element.className).to.equal('cardNav');
    });

    it("renders the buttons", () => {
      let buttons = element.querySelectorAll('button');
      expect(buttons.length).to.equal(1);
    });
  });

  describe("click handling", () => {

    describe("when explore button is clicked", () => {

      beforeEach(() => {
        Actions.setViewModel = sinon.spy();
        React.addons.TestUtils.Simulate.click(exploreButton);
      });

      it("calls the right action", () => {
        expect(Actions.setViewModel).to.be.calledWith(selection);
      });
    });
  });
});

function renderButtons({ type, id }){
  let container = TestUtils.renderIntoDocument(
    <CardNav type={ type } id={ id }/>
  );

  let element = React.findDOMNode(container);
  let exploreButton = element.querySelector('.browse');
  return [element, exploreButton];
}