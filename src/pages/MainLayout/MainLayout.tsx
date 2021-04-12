import * as React from 'react';
import Navbar from 'components/Navbar';

const MainLayout: React.FC = ({ children }) => (
      <>
        <Navbar />
        {children}
      </>
  );

export default MainLayout;
