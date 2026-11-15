"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = exports.NoteBook = exports.Note = exports.Admin = exports.User = void 0;
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this._age = age;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this._age = value;
    }
    displayInfo() {
        console.log(`User Info: ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
    }
    // Aggregation method
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
}
exports.User = User;
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(notebook, noteId) {
        notebook.removeNote(noteId);
        console.log(`Admin ${this.name} managed note with ID: ${noteId}`);
    }
}
exports.Admin = Admin;
class Note {
    id;
    tittle;
    content;
    userId;
    constructor(id, tittle, content, userId) {
        this.id = id;
        this.tittle = tittle;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        return this.content.slice(0, 20) + "...";
    }
}
exports.Note = Note;
class NoteBook {
    notes = [];
    addNote(id, tittle, content, user) {
        const note = new Note(id, tittle, content, user);
        this.notes.push(note);
    }
    removeNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
    }
    getNotes() {
        return this.notes;
    }
}
exports.NoteBook = NoteBook;
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }
    getAllItems() {
        return this.items;
    }
}
exports.Storage = Storage;
const user1 = new User(1, "Abdalrahman", "abdoemad@gmail.com", "pass123", "01151894760", 23);
user1.displayInfo();
const admin1 = new Admin(2, "moaz", "admin@mail.com", "adminPass", "01111111111", 25);
const notebook1 = new NoteBook();
// Aggregation: notebook added to user
user1.addNotebook(notebook1);
// Composition: Note created inside notebook
notebook1.addNote(1, "First Note", "This is first note content testtt", user1);
notebook1.addNote(2, "Second Note", "This is second note content testtt", user1);
notebook1.addNote(3, "Third Note", "This is third note content testtt", user1);
console.log("Note preview:", notebook1.getNotes()[0].preview());
// Admin managing (عملته انه يقدر delete note ) notes
admin1.manageNotes(notebook1, 1);
// Generic Storage
const userStorage = new Storage();
userStorage.addItem(user1);
console.log("Stored users:", userStorage.getAllItems());
console.log("Stored users notes:", userStorage.getAllItems()[0].notebooks[0].getNotes());
// عملت 3 notes و بعدين عملت delete لل note اللي id بتاعها 1 و بعدين عملت console.log لل notes اللي موجوده دلوقتي و هتلاقي ان note اللي id بتاعها 1 اتحذفت
