import { HeroComponent } from './components/hero';
import { WhatVWBLComponent } from './components/what-vwbl';
import { HowToComponent } from './components/howto';

export const HomeComponent: React.FC = () => {
  return (
    <>
      <HeroComponent />
      <WhatVWBLComponent />
      <HowToComponent />
    </>
  );
};
