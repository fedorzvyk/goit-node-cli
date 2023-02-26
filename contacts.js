const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await listContacts();
    const contact = contactList.find(({ id }) => id === contactId);
    return contact || `No contact with id: ${contactId}`;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await listContacts();
    const newList = await contactList.filter(
      contact => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newList), 'utf8');

    return newList;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await listContacts();
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contactList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return contactList;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
