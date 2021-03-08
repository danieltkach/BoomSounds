import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetch_users } from '../../redux/users/actions';
import UsersTable from '../UsersTable/UsersTable.component';
import styles from './UsersList.module.css';

const UsersList = ({ users, fetch_users }) => {
  useEffect(() => {
    fetch_users();
  }, []);

  return (
    <>
      <h1>Usuarios del sitio</h1>
      <table className={styles.table_users}>
        <tr>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
        {users.map((user) => (
          <UsersTable user={user} />
        ))}
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, { fetch_users })(UsersList);
