import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItems/NavigationItem'
configure({ adapter: new Adapter() })
describe('<Navigation Items>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })


    it('should render 2 nav items if not authenticated', () => {

        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render 3 nav items if authenticated', () => {
        wrapper = shallow(<NavigationItems isAuthenticated />)
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render 3 nav items if authenticated', () => {
        wrapper = shallow(<NavigationItems isAuthenticated />)
        expect(wrapper.contains(<NavigationItem link="/Logout">Logout</NavigationItem>)).toEqual(true)
    })



})