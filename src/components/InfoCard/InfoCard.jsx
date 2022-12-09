import React, { useState, useEffect } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await userApi.getUser(profileUserId);
        console.log(profileUser, "otheruser");
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <div className="InfoCard">
      <div className="InfoHead">
        <h3>Profile Info</h3>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.relationship
            : profileUser?.data?.relationship}
        </span>
      </div>
      <div className="info">
        <b>Lives in </b>
        <span>
          {user._id === profileUserId
            ? profileUser?.livesin
            : profileUser?.data?.livesin}{" "}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>
          {user._id === profileUserId
            ? profileUser?.worksAt
            : profileUser?.data?.worksAt}
        </span>
      </div>
      {user._id === profileUserId ? (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default InfoCard;
