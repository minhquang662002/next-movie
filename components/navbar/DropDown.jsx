import { logout } from "../../utils/api";
import { LogoutIcon } from "@heroicons/react/outline";

const DropDown = ({ user, showSettings }) => {
  return (
    <div
      className={`${
        showSettings ? "flex" : "hidden"
      } flex absolute flex flex-col bg-gray-800 -bottom-36 -right-2 rounded-lg p-4`}
    >
      <div className="flex items-center gap-x-2">
        <div
          className="bg-center bg-cover h-10 w-10 border border-white rounded-full"
          style={{ backgroundImage: `url(${user?.photoURL})` }}
        />
        <p>{user.displayName}</p>
      </div>
      <div className="mt-4">
        <p
          className="flex items-center gap-x-2 hover:bg-gray-900 cursor-pointer p-2 rounded-lg transition-colors"
          onClick={logout}
        >
          {" "}
          <LogoutIcon className="w-6 h-6" /> Logout
        </p>
      </div>
    </div>
  );
};

export default DropDown;
