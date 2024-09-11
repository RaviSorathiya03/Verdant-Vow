import { PrismaClient } from "@prisma/client";
import crypto from "crypto"; // For generating unique codes

const client = new PrismaClient();

// Function to generate activation codes
const generateActivationCodes = async (req, res) => {
  try {
    const { count } = req.body;
    const organizationId = req.organisationId;

    // Validate input
    if (!count || count <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const codes = [];

    // Generate activation codes
    for (let i = 0; i < count; i++) {
      const code = crypto.randomBytes(16).toString("hex"); // Generate a unique code
      codes.push({
        code,
        organizationId,
      });
    }

    // Bulk create activation codes
    await client.activationCode.createMany({
      data: codes,
    });

    res.status(201).json({ message: `${count} activation codes generated successfully` });
  } catch (e) {
    // console.error(e);
    res.status(500).json({ message: "Something went wrong", error: e.message });
  } finally {
    await client.$disconnect();
  }
};

// Function to verify activation code and ensure one code per user
const verifyActivation = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.userId;

    // Validate input
    if (!code || !userId) {
      return res.status(400).json({ message: "Activation code and user ID are required" });
    }

    // Check if the user has already activated a code
    const existingActivation = await client.activationCode.findFirst({
      where: {
        userId: userId,
        isUsed: true,
      },
    });

    if (existingActivation) {
      return res.status(400).json({ message: "User has already activated a code" });
    }

    // Find the activation code in the database
    const activationCode = await client.activationCode.findUnique({
      where: { code },
    });

    if (!activationCode) {
      return res.status(404).json({ message: "Activation code not found" });
    }

    // Check if the code is already used
    if (activationCode.isUsed) {
      return res.status(400).json({ message: "Activation code has already been used" });
    }

    // If the code is valid and not used, mark it as used and associate it with the user
    await client.activationCode.update({
      where: { code },
      data: { isUsed: true, userId: userId },
    });

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        organizationId: activationCode.organizationId,
      },
    });

    res.status(200).json({ message: "Activation code is valid and has been used" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong", error: e.message });
  } finally {
    await client.$disconnect();
  }
};

export { generateActivationCodes, verifyActivation };
