// ProfilePage.tsx
import React from "react";
import { useAuth } from "../providers/AuthContextProvider";
import AuthContainer from "../components/AuthContainer";
import BadgeScene from "../components/BadgeScene";

const ProfilePage = () => {
  const { userProfile } = useAuth();

  return (
    <div className="w-full flex">
      <div className="p-4 pl-20 pt-36 ">
        <AuthContainer />
      </div>
      {/* Conditionally render BadgeScene only if user is logged in */}
      {userProfile && (
        <div className="flex-1">
          <BadgeScene
            userEmail={userProfile.email}
            userName={userProfile.name}
            userPicture={userProfile.picture}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
