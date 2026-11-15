export class User {
  public id: number;
  public name: string;
  public email: string;
  protected password: string;
  public phone: string;
  private _age: number;


  public notebooks: NoteBook[] = [];

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
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

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    if (value < 18 || value > 60) {
      throw new Error("Age must be between 18 and 60.");
    }
    this._age = value;
  }

  public displayInfo(): void {
    console.log(`User Info: ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
  }

  // Aggregation method
  public addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }
}


export class Admin extends User {
  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    super(id, name, email, password, phone, age);
  }


  public manageNotes(notebook: NoteBook, noteId: number): void {
    notebook.removeNote(noteId);
    console.log(`Admin ${this.name} managed note with ID: ${noteId}`);
  }
}


export class Note {
  public id: number;
  public tittle: string;
  public content: string;

  public userId: User;

  constructor(id: number, tittle: string, content: string, userId: User) {
    this.id = id;
    this.tittle = tittle;
    this.content = content;
    this.userId = userId;
  }

  public preview(): string {
    return this.content.slice(0, 20) + "...";
  }
}


export class NoteBook {
  private notes: Note[] = [];


  public addNote(id: number, tittle: string, content: string, user: User): void {
    const note = new Note(id, tittle, content, user);
    this.notes.push(note);
  }

  public removeNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  public getNotes(): Note[] {
    return this.notes;
}

}


export class Storage<T> {
  private items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }

  public removeItem(item: T): void {
    this.items = this.items.filter(i => i !== item);
  }

  public getAllItems(): T[] {
    return this.items;
  }
}


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
const userStorage = new Storage<User>();
    userStorage.addItem(user1);
    console.log("Stored users:", userStorage.getAllItems());
    console.log("Stored users notes:", userStorage.getAllItems()[0].notebooks[0].getNotes());




    // عملت 3 notes و بعدين عملت delete لل note اللي id بتاعها 1 و بعدين عملت console.log لل notes اللي موجوده دلوقتي و هتلاقي ان note اللي id بتاعها 1 اتحذفت