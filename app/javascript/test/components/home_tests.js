import React from 'react';
import { renderComponent, expect } from '../test_helper';
import Home from '../../bundles/components/Home';

describe('Home', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Home)
  });
  it('displays the input', () => {
    expect(component.find('.home')).to.exist;
  });
  describe('Input', () => {
    it('works', () => {

    });
  });
});
