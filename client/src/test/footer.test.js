import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/footer.js';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import expect from 'expect'
import enzymify from 'expect-enzyme'

expect.extend(enzymify());

describe('<Footer />', () => {
  const footer = shallow(<Footer />);

  it('renders itself', () => {
    expect(footer).toBeA('footer');
    expect(footer).toHaveClass('text-center');
    expect('Thanks for visiting the Tea Shop' == footer.text());

  });

  it('renders its contets', () => {
    expect(footer).toHaveRendered(
      <footer className="footer text-center">
        <div className="container">
          <p className="footer-text">Thanks for visiting the Tea Shop</p>
        </div>
      </footer>
    );
  });
});
