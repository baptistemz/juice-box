import React from 'react';
import { renderComponent, expect } from '../test_helper';
import PreHome from '../../bundles/components/PreHome';

describe('PreHome', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(PreHome)
  });
  it('displays the input', () => {
    expect(component.find('.home')).to.exist;
  });
  describe('Input', () => {
    it('works', () => {

    });
  });
});
