const fs = require("fs/promises");
const { Command } = require("commander");
const program = new Command();

const contactService = require("./contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contactService.listContacts();
        console.log(allContacts);
        break;
      case "get":
        const oneContact = await contactService.getContactById(id);
        console.log(oneContact);
        break;
      case "add":
        const newContact = await contactService.addContact({
          name,
          email,
          phone,
        });
        console.log(newContact);
        break;
      case "update":
        const updatedContact = await contactService.updateContact(id, {
          name,
          email,
          phone,
        });
        console.log(updatedContact);
        break;
      case "remove":
        const removedContact = await contactService.removeContact(id);
        console.log(removedContact);
        break;
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error);
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();
invokeAction(options);
