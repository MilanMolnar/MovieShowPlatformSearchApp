import { useAuth } from "../providers/AuthContextProvider";
import AuthContainer from "../components/AuthContainer";
import BadgeScene from "../components/BadgeScene";
import CreditFooter from "../components/CreditFooter";
import ChatGPTTokenInput from "../components/ChatGPTTokenInput";

const ProfilePage = () => {
  const { userProfile } = useAuth();

  return (
    <div
      className={`w-full flex ${
        !userProfile ? "justify-center" : "flex-col md:flex-row"
      }`}
    >
      <div
        className={`p-4 z-50  ${
          !userProfile ? "pt-36" : "md:pl-20 pt-10 md:pt-36"
        }`}
      >
        <div >
        <AuthContainer />
        </div>
        {userProfile && (
        <div className="z-50">
          <ChatGPTTokenInput />
        </div>
      )}
      </div>
      {/* Conditionally render BadgeScene only if user is logged in */}
      {userProfile && (
        <div className="flex-1  h-[50vh]  flex justify-center items-center md:items-start pt-60 md:pt-0 z-0 ">
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
