import './HomePage.scss';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Terminal from '../components/Terminal';

export default function HomePage() {
  return (
    <div className='container py-12 space-y-8'>
      <div className='space-y-6 text-center header'>
        <Logo />
        <div className='grid grid-rows'>
          <h1 className='text-6xl justify-center text-purple-600'>
            Bates Solutions
          </h1>
        </div>
      </div>
      <div>
        <Terminal />
      </div>
      <div>Contents</div>
    </div>
  );
}
