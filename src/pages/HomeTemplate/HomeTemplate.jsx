import React from 'react';
import Topbar from './../../components/topbar/Topbar';
import Sidebar from './../../components/sidebar/Sidebar';
import './HomeTemplate.css'

export const  HomeLayout = ({children}) => {
  console.log(children);
    return (
        <React.Fragment>
          <Topbar/>
            <div className="container">
                <Sidebar/>
                {children}
            </div>
        </React.Fragment>
    );
};

