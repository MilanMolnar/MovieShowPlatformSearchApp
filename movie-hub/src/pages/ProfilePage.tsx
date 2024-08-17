import React from "react";
import { useAuth } from "../providers/AuthContextProvider";
import AuthContainer from "../components/AuthContainer";
import BadgeScene from "../components/BadgeScene";
import CreditFooter from "../components/CreditFooter";

const ProfilePage = () => {
  const { userProfile } = useAuth();

  return (
    <div
      className={`w-full flex ${
        !userProfile ? "justify-center" : "flex-col md:flex-row"
      }`}
    >
      <div className={`p-4 ${!userProfile ? "pt-36" : "md:pl-20 pt-36"}`}>
        <AuthContainer />
      </div>
      {/* Conditionally render BadgeScene only if user is logged in */}
      {userProfile && (
        <div className="flex-1 -mt-4 md:p-0">
          <BadgeScene
            userEmail={userProfile.email}
            userName={userProfile.name}
            userPicture={userProfile.picture}
          />
        </div>
      )}
      {userProfile && <CreditFooter />}
    </div>
  );
};

export default ProfilePage;
