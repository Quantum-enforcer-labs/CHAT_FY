import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useKeyboardSound } from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import type { ChangeEvent, KeyboardEvent } from "react";

const MessageInput = () => {
  const { playRandomSound } = useKeyboardSound();
  const { isSoundOn, sendMessage } = useChatStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- Send Message (Enter key) ---
  const handleSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    if (isSoundOn) playRandomSound();

    sendMessage({ text: text.trim(), image: imagePreview });
    resetInput();
  };

  // --- Image Upload Handler ---
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // --- Clear Selected Image ---
  const handleImageRemove = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Reset Input After Send ---
  const resetInput = () => {
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Click Send Button ---
  const handleSendClick = () => {
    if (!text.trim() && !imagePreview) return;
    if (isSoundOn) playRandomSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    resetInput();
  };

  return (
    <div className="relative border-t border-white/10 bg-slate-900/60 backdrop-blur-md p-4 flex flex-col gap-3">
      {/* --- Image Preview --- */}
      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-40 h-32 rounded-lg overflow-hidden border border-cyan-500/30 mx-auto shadow-md"
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
            <button
              onClick={handleImageRemove}
              className="absolute top-1 right-1 bg-black/50 hover:bg-black/80 rounded-full p-1 text-white transition"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Input Row --- */}
      <div className="flex items-center gap-3">
        {/* Upload Image Button */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 transition"
        >
          <ImageIcon size={20} />
        </button>

        {/* Message Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleSendMessage}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          {/* Send Button */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <button
              onClick={handleSendClick}
              className="p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg transition"
            >
              <Send size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
