import * as React from 'react';
import './App.css';
import Logo from '../Navbar/Logo';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="mx-5 mt-3 flex flex-row">
        <Logo />

        <span className="mx-3 mt-2 text-3xl font-mono">Project Collab</span>

      </div>
      <div className='w-full text-center text-2xl mt-5'>
            404: Page not found.
        </div>
    </div>
  );
}