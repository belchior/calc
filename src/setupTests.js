import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-prop-type-error';

configure({ adapter: new Adapter() });
