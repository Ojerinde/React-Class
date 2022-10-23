import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import User from "./User";

const userPerPage = 5;

const Users = ({ users, isLoading }) => {
  const [start, setStart] = useState(0);
  const end = start + userPerPage;

  const changePage = (page) => {
    setStart((page - 1) * userPerPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <ul className="user__ul">
        {users.slice(start, end).map((user, index) => (
          <User name={user.name} email={user.email} key={index} />
        ))}
      </ul>
      <Pagination
        totalUsers={users.length}
        usersPerPage={userPerPage}
        onChange={changePage}
      />
    </>
  );
};
export default Users;
