import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api/UserRequest";

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("mounting chat");
    const userId = data.members.find((id) => id !== currentUser);
    console.log(userId, "chatt");
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        console.log(data, "dataaaaaa");
        setUserData(data);
        dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? https://sociout-server.lapstore.online/images/ + userData.profilePicture
                : https://sociout-server.lapstore.online/images/ + "defaultProfile.png"
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />

          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>{userData?.username}</span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
