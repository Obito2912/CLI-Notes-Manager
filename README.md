# Overview

I'm trying to gain more knowledge by creating this CLI product. I'm trying to focus on getting new skills that will help me stay up to date and AWS will do that because it is a tool used by many companies and people for small, medium, and big projects.

This program allows users to store information using the terminal. You need to connect to AWS DynamoDB in order to use the program and you will be able to do CRUD operations to create, find, update, or delete a personal note.

The purpose of writing this program was to learn how to work with Cloud Databases but also because I don't remember things sometimes and this is a good and personal place where I can save those things and look them up later.

[Software Demo Video](https://youtu.be/W95OU1i3vN0)

# Cloud Database

I used DynamoDB

I created one table with a single object which contains the following: title, createdAt, noteId, tag (optional), url (optional). Using three files for this project allowed me to separate concerns, data, cli, and types and the final project allows users to add, list, update, and delete notes.

# Development Environment

I used a AWS account along with the dynamoDb for the cloud database, I used nodeJs, and finally I used the aws interface and set it up in the terminal to run this program locally.

I used TypeScript for the language.

# Useful Websites

- [devToolsInstaller](https://devtoolsinstaller.com/guides/awscli)
- [AWS](https://aws.amazon.com)
- [AWS documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

# Future Work

- I will create another function to find a note by id
- I will add a form of authentication maybe
- I will generate questions or maybe a quick help display for the commands in case people forgot something
