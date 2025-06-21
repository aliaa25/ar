

import { IoSearchOutline } from "react-icons/io5"; 

const SearchBar = () => {
  return (
    <div className="search container w-[50%] m-auto pb-8">
      <div className="relative flex items-center">
        <input
          type="text" 
          placeholder="Search" 
          className="w-full h-12 px-4 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-mainbackground transition-all"
        />
        <IoSearchOutline className="absolute left-3 text-gray-500" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
