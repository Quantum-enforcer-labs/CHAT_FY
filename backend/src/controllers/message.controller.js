import Message from "../models/Messages.model.js";
import User from "../models/User.model.js";
import { imagekit } from "../lib/imageKit.js";
import message from "../models/Messages.model.js";

export const getContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
    });

    const chatPartnersId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUser
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");
    res.status(200).json(chatPartners);
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
          receiverId: userToChat,
        },
        {
          senderId: userToChat,
          receiverId: loggedInUserId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    if (!text || !image) {
      return res.status(400).json({
        message: "Text or Image is required",
      });
    }
    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You can not send messages to yourself",
      });
    }

    const receiverIdExists = await User.exists({ _id: receiverId });

    if (!receiverIdExists) {
      return res.status(400).json({
        message: "Reciever not found in the database",
      });
    }
    let imageUrl = "";

    if (image) {
      const uploadResponse = await imagekit.upload({
        file: image,
        fileName: `${Date.now()}_message_image_${senderId}`,
        folder: "/message_images/",
      });
      imageUrl = uploadResponse.url;
    }
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    // real time sending
    res.status(201).json(newMessage);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
