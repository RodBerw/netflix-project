'use-client';

import Search from '../../public/icons/search.svg';
import Notification from '../../public/icons/notification.svg';
import Profile from '../../public/icons/profile.svg';
import Select from './Select';




export default function Header() {
  return (
<header className="p-4 lg:pl-10 lg:pr-10 w-full flex justify-between items-center bg-gradient-to-b from-black to-background">
    <div className="min-w-40 flex w-2/3 items-center space-x-4">
        <img src='/images/netflix-logo.png' alt='Logo' className='w-1/2 min-w-16 max-w-32 h-10 object-cover' />
        <div className='md:hidden flex'>
            <Select />
        </div>
        <ul className="hidden md:flex md:text-xs lg:text-base space-x-4 text-white">
            <li >Home</li>
            <li>Series</li>
            <li>Films</li>
            <li>Latest</li>
            <li>My List</li>
        </ul>
    </div>
    <div className="min-w-24 flex justify-end w-1/3 space-x-4">
        <Search className="text-white" />
        <Notification className="text-white" />
        <Profile className="text-white" />
    </div>
</header>

  );
}