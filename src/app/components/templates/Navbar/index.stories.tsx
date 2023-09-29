import Navbar from '.';
import dict from '@/dictionaries/en.json';

export default {
  title: 'temlates/Navbar',
  component: Navbar,
};

export const Default = () => <Navbar dict={dict.navbar} />;
