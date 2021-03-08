import React, { useEffect } from 'react';
import styles from './UserProfile.module.css';
import { connect } from 'react-redux';
import { fetch_user } from '../../redux/users/actions';

const UserProfile = ({ user }) => {
  return (
    <>
      <div className={styles.profile_container}>
        <div className={styles.image_and_info}>
          <div className={styles.info_container}>
            <p>Email : {user.email}</p> <br />
            <p>Rol : {user.role}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

export default connect(mapStateToProps, { fetch_user })(UserProfile);
