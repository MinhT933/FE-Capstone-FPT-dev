import React from 'react';
import { Route } from "react-router-dom";
import Topbar from './../../components/topbar/Topbar';
import Sidebar from './../../components/sidebar/Sidebar';

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

// export default function HomeTemplate({ Component, ...props }) {
//     return (
//       <Route
//         {...props}
//         render={(propsComponent) => {
//             if (true) {
//                 return (
//                     <HomeLayout>
//                       <Component {...propsComponent} />
//                     </HomeLayout>
//                   )
//             }else{
//               // something went wrong 
//             }
//         }}
//       />
//     );
//   }