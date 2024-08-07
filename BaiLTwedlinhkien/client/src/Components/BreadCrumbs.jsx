/* eslint-disable react/prop-types */
// import { Link, useLocation } from 'react-router-dom'
// 
function BreadCrumbs({ children }) {
  // const location = useLocation();

  return (
    <nav className='container mx-auto p-2 flex flex-wrap space-x-2'>
      {children}
    </nav >
  );
}

export default BreadCrumbs;