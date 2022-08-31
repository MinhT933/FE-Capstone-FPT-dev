import React from 'react';
import Topbar from './../../components/topbar/Topbar';
import Sidebar from './../../components/sidebar/Sidebar';

export const  HomeLayout = ({children}) => {
  console.log(children);
    return (
        <React.Fragment>
          <Topbar/>
            <div className="container" style={{display:'flex'}} >
                <Sidebar/>
                {children}
            </div>
        </React.Fragment>
    );
};

