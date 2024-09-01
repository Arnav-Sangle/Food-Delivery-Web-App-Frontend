import React from "react";

import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <form>
        {/* Search Bar */}
        <div className="input-group">
            <input
            type="text"
            placeholder="Search your favourite Restaurant..."
            id="search_field"
            className="form-control"
            />


            {/* Search Icon */}
            <div className="input-group-append">
                <button id="search_btn" className="btn">
                    
                    <FaSearch className="fa fa-search"/>
                        {/* 
                            https://react-icons.github.io/react-icons/search/#q=search 
                                need to install package "react-icons" 
                        */}
                    

                </button>
            </div>
            
        </div>
    </form>
  );
}
