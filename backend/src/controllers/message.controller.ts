import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?.id;

    if (!senderId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!message) {
      res.status(400).json({ error: "Message cannot be empty" });
      return;
    }

    if (senderId === receiverId) {
      res.status(400).json({ error: "Cannot send message to yourself" });
      return;
    }

    //  Check if a conversation already exists
    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          some: { userId: senderId },
        },
        AND: {
          participants: {
            some: { userId: receiverId },
          },
        },
      },
      include: { participants: true },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: receiverId } } },
            ],
          },
        },
        include: { participants: true },
      });
    }

    // Create the new message
    const newMessage = await prisma.message.create({
      data: {
        body: message,
        senderId,
        conversationId: conversation.id,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        data: { lastMessageAt: new Date() },
        include: { participants: true },
      });
    }

    // Socket.io implementation

    res.status(201).json({ newMessage });
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?.id;

    if (!senderId || !userToChatId) {
      res.status(400).json({ error: "Missing senderId or userToChatId" });
      return;
    }

    // find the conversation where the sender and receiver are participants
    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          some: { userId: senderId },
        },
      },
      include: { participants: true },
    });

    // If conversation does not exist,then create one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            create: [
              { user: { connect: { id: senderId } } },
              { user: { connect: { id: userToChatId } } },
            ],
          },
        },
        include: { participants: true },
      });
    }

    // Ensure that the sender is a participant in this conversation
    const isParticipant = conversation.participants.some(
      (participant) => participant.userId === senderId
    );

    if (!isParticipant) {
      res
        .status(403)
        .json({ error: "You are not a participant in this conversation" });
      return;
    }

    // Fetch messages separately
    const messages = await prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            fullName: true,
            profilePic: true,
          },
        },
      },
    });

    // Return messages
    res.status(200).json(messages);
  } catch (error: any) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForSidebars = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Fetch conversations where the user is a participant
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
                profilePic: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastMessageAt: "desc",
      },
    });

    // Extract unique users from conversations (excluding the current user)
    const users = new Map();

    conversations.forEach((conversation) => {
      conversation.participants.forEach((participant) => {
        if (participant.userId !== userId) {
          users.set(participant.user.id, participant.user);
        }
      });
    });

    res.status(200).json(Array.from(users.values()));
  } catch (error: any) {
    console.error("Error in getUsersForSidebars: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
