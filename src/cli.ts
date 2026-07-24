import { Command } from "commander";
import {
  addNote,
  getAllNotes,
  deleteNote,
  getNotesByTag,
  updateNote,
} from "./data.js";
import { randomUUID } from "crypto";

// Initialize the command-line interface
const program = new Command();

// Define the "add" command to add a new note
program
  .command("add")
  .requiredOption("--title <title>", "note title")
  .option("--url <url>", "note url")
  .option("--tag <tag>", "note tag")
  .action(async (options) => {
    // Destructure the options to get title, url, and tag
    const { title, url, tag } = options;
    // Call the addNote function with a new note object
    await addNote({
      noteId: randomUUID(),
      createdAt: new Date().toISOString(),
      title,
      url,
      tag,
    });
    console.log("Note added successfully.");
  });

// Define the "list" command to list all notes
program
  .command("list")
  .option("--tag <tag>", "filter by tag")
  .action(async (options) => {
    const { tag } = options;
    // If a tag is provided, get notes by tag; otherwise, get all notes
    if (tag) {
      const notes = await getNotesByTag(tag);
      if (notes && notes.length > 0) {
        console.log(`Notes with tag "${tag}":`);
        notes.forEach((note) => {
          console.log(
            `- ${note.title} (ID: ${note.noteId} URL: ${note.url || "N/A"})`,
          );
        });
      } else {
        console.log(`No notes found with tag "${tag}".`);
      }
    } else {
      const notes = await getAllNotes();
      if (notes && notes.length > 0) {
        console.log("All notes:");
        notes.forEach((note) => {
          console.log(
            `- ${note.title} (ID: ${note.noteId} URL: ${note.url || "N/A"})`,
          );
        });
      } else {
        console.log("No notes found.");
      }
    }
  });

// Define the "update" command to update an existing note
program
  .command("update <noteId>")
  .option("--title <title>", "new title")
  .option("--url <url>", "new url")
  .option("--tag <tag>", "new tag")
  .action(async (noteId, options) => {
    const { title, url, tag } = options;
    const updatedNote: any = {};
    // Only include fields that are provided
    if (title) updatedNote.title = title;
    if (url) updatedNote.url = url;
    if (tag) updatedNote.tag = tag;
    // Call the updateNote function with the noteId and updated fields
    await updateNote(noteId, updatedNote);
    console.log("Note updated successfully.");
  });

// Define the "delete" command to delete a note
program.command("delete <noteId>").action(async (noteId) => {
  await deleteNote(noteId);
  console.log("Note deleted successfully.");
});

program.parse();
