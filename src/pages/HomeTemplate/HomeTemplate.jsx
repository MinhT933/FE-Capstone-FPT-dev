import React from 'react';
import Topbar from './../../components/topbar/Topbar';
import Sidebar from './../../components/sidebar/Sidebar';

export const  HomeLayout = ({children}) => {
  console.log("heheh");
    return (
        <React.Fragment>
          <Topbar/>
            <div className="container"  >
                <Sidebar/>
                {children}
                <h1>heheh</h1>
            </div>
        </React.Fragment>
    );
};

