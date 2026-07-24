import "dotenv/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { Note } from "./types.js";

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});
// Create a DynamoDB Document Client
const documentClient = DynamoDBDocumentClient.from(client);

// Function to add a note to DynamoDB using the Note interface
export async function addNote(note: Note) {
  await documentClient.send(
    new PutCommand({
      TableName: process.env.TABLE_NAME || "Notes",
      Item: note,
    }),
  );
}

// Function to get all notes from DynamoDB
export async function getAllNotes() {
  const result = await documentClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME || "Notes",
    }),
  );
  return result.Items;
}

// Function to delete a note from DynamoDB by noteId
export async function deleteNote(noteId: string) {
  await documentClient.send(
    new DeleteCommand({
      TableName: process.env.TABLE_NAME || "Notes",
      Key: { noteId: noteId },
    }),
  );
}
// Function to get notes by tag from DynamoDB
export async function getNotesByTag(tag: string) {
  const result = await documentClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME || "Notes",
      FilterExpression: "tag = :tagValue",
      ExpressionAttributeValues: {
        ":tagValue": tag,
      },
    }),
  );
  return result.Items;
}

// Function to update a note in DynamoDB by noteId
export async function updateNote(noteId: string, updatedFields: Partial<Note>) {
  const updateExpressions: string[] = [];
  const expressionAttributeValues: Record<string, any> = {};

  for (const key in updatedFields) {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = (updatedFields as any)[key];
  }

  if (updateExpressions.length === 0) return;

  await documentClient.send(
    new UpdateCommand({
      TableName: process.env.TABLE_NAME || "Notes",
      Key: { noteId },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeValues: expressionAttributeValues,
    }),
  );
}

await updateNote("1", { title: "Updated Sample Note" });
