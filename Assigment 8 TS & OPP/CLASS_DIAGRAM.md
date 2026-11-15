

    class User {
        +number id
        +string name
        +string email
        #string password
        +string phone
        -number _age
        +NoteBook[] notebooks
        +displayInfo() void
        +addNotebook(NoteBook) void
    }

    class Admin {
        +manageNotes(NoteBook, number) void
    }

    class Note {
        +number id
        +string tittle
        +string content
        +User userId
        +preview() string
    }

    class NoteBook {
        -Note[] notes
        +addNote(number, string, string, User) void
        +removeNote(number) void
        +getNotes() Note[]
    }

    class Storage<T> {
        -T[] items
        +addItem(T) void
        +removeItem(T) void
        +getAllItems() T[]
    }

   User  ◇──────  NoteBook : Aggregation
NoteBook ◆──────  Note : Composition
Note     ──────▶  User : Association
User    ◁────── Admin : Inheritance


## 2. Identify Relationships (1 Mark)

**Inheritance:** Admin extends User. So Admin gets all the properties and methods from User (like id, name, displayInfo) and adds its own method `manageNotes()`.

**Aggregation:** User and NoteBook. The user has an array of notebooks. The notebook is created outside the user and then passed to it using `addNotebook()`. If we delete the user, the notebook can still exist on its own.

**Composition:** NoteBook and Note. The notebook is responsible for creating notes inside it using `addNote()` which calls `new Note()` internally. The note can't exist without the notebook, so if the notebook is deleted, all its notes are deleted too.

**Association:** Note and User. Each note has a `userId` property that refers to the user who wrote it. It's just a reference, the note doesn't own or control the user.
