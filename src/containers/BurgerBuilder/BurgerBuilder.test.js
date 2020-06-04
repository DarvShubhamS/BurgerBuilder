import { BurgerBuilder } from './BurgerBuilder'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from '../../components/Burger/BuilControls/BuildControls'
configure({ adapter: new Adapter() })
describe('<Burger bUILDER />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngs={() => { }} />)
    })

    it('should render build controls when receiving ings', () => {
        wrapper.setProps({ ings: { salad: 0 } })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})
