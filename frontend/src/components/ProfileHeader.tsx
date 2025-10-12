import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuth";
import { LogOutIcon, Volume2Icon, VolumeOff } from "lucide-react";
import { useLogout } from "../hooks/userAuthLogic";

const ProfileHeader = () => {
  const { authUser, updateProfile, onlineUsers } = useAuthStore();
  const { isSoundOn, toggleSound } = useChatStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { mutate: logOut } = useLogout();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mouseClickSound = useRef(new Audio("/sounds/mouse-click.mp3"));

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const preview = reader.result as string;
      setSelectedImage(preview);

      try {
        await updateProfile({ image: file });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const isOnline = authUser?.id ? onlineUsers.includes(authUser.id) : false;

  return (
    <div className="px-4 py-3 border-b border-slate-700/50 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/80 backdrop-blur-sm shadow-md rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative group">
            <button
              className="w-11 h-11 rounded-full overflow-hidden border border-slate-700 hover:border-cyan-500/70 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={
                  selectedImage || authUser?.profilePic || "/profile_pic.jpg"
                }
                alt={authUser?.fullName || "User"}
                className={`w-full h-full object-cover ${
                  isOnline ? "avatar-online" : "avatar-offline"
                }`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                <span className="text-white text-[10px] font-medium">
                  Change
                </span>
              </div>
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={uploadImage}
              className="hidden"
            />
          </div>

          {/* Username + Status */}
          <div>
            <h3 className="text-slate-200 font-medium text-sm max-w-[150px] truncate">
              {authUser?.fullName || "User"}
            </h3>
            <p
              className={`text-xs flex items-center gap-1 ${
                isOnline ? "text-green-400" : "text-slate-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Logout */}
          <button
            onClick={() => logOut()}
            className="p-2 rounded-full bg-slate-800/60 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          >
            <LogOutIcon className="w-5 h-5" />
          </button>

          {/* Sound Toggle */}
          <button
            className={`p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 transition-all duration-300 ${
              isSoundOn
                ? "text-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
            onClick={() => {
              if (isSoundOn) {
                const audio = mouseClickSound.current;
                audio.currentTime = 0;
                audio.play().catch(() => {});
              }
              toggleSound();
            }}
          >
            {isSoundOn ? (
              <Volume2Icon className="w-5 h-5" />
            ) : (
              <VolumeOff className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
