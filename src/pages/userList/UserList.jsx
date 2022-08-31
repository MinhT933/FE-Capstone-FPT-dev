import "./userList.css";
import { DataGrid} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://lh3.googleusercontent.com/pw/AL9nZEW3KGj4QJKIEhFlgC5T4Pdwv2AuWVfEJ4qmomgsGIBi1k6mcibWxv3t1sZyu-Z36NzEa35K9s4InDovIYOeMqo6LYYXuvIiCJ-OH1Ilf4YFlj0iRIHDDLcJypkE08JqNqA4gSSPGEeWFd77MLxO_21Z=w447-h649-no?authuser=0" alt="" />
             Phạm Đan Quỳnh
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "Phone",
      headerName: "Liên hệ",
      width: 160,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/detail/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteIcon
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
