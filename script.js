// Book Constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Book prototype method to display information
Book.prototype.displayInfo = function() {
    return `${this.title} by ${this.author} (${this.pages} pages)`;
};

// Library array to store books
let library = [];

// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = parseInt(document.getElementById('bookPages').value);

    if (!title || !author || !pages) {
        alert('Please fill in all fields');
        return;
    }

    const book = new Book(title, author, pages);
    library.push(book);
    updateBookList();
    clearBookInputs();
}

// Function to search books
function searchBooks() {
    const searchTerm = document.getElementById('searchTerm').value.toLowerCase();
    const results = library.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm)
    );
    displayBooks(results);
}

// Function to filter books with more than 100 pages
function filterLongBooks() {
    const longBooks = library.filter(book => book.pages > 100);
    displayBooks(longBooks);
}

// Function to display formatted books
function displayFormattedBooks() {
    const formattedBooks = library.map(book => ({
        title: "Title: " + book.title,
        author: "Author: " + book.author,
        pages: book.pages
    }));
    displayBooks(formattedBooks);
}

// Helper functions for the library system
function updateBookList() {
    displayBooks(library);
}

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '<h3>Books:</h3>' + 
        books.map(book => `<div>${book.title} by ${book.author} (${book.pages} pages)</div>`).join('');
}

function clearBookInputs() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookPages').value = '';
}

// Account Constructor
function Account(owner, balance) {
    this.accountNumber = Math.floor(Math.random() * 1000000);
    this.owner = owner;
    this.balance = balance;
}

// Account prototype methods
Account.prototype.deposit = function(amount) {
    if (amount > 0) {
        this.balance += amount;
        return true;
    }
    return false;
};

Account.prototype.withdraw = function(amount) {
    if (amount > 0 && amount <= this.balance) {
        this.balance -= amount;
        return true;
    }
    return false;
};

Account.prototype.calculateInterest = function(rate, years) {
    const principal = this.balance;
    const compoundedAmount = principal * Math.pow(1 + (rate / 100), years);
    return compoundedAmount - principal;
};

// Array to store accounts
let accounts = [];

// Function to create a new account
function createAccount() {
    const owner = document.getElementById('accountOwner').value;
    const balance = parseFloat(document.getElementById('initialBalance').value);

    if (!owner || isNaN(balance)) {
        alert('Please fill in all fields correctly');
        return;
    }

    const account = new Account(owner, balance);
    accounts.push(account);
    updateAccountInfo();
    alert(`Account created successfully! Your account number is: ${account.accountNumber}`);
}

// Function to deposit funds
function deposit() {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const account = findAccount(accountNumber);

    if (!account) {
        alert('Account not found');
        return;
    }

    if (account.deposit(amount)) {
        updateAccountInfo();
        alert('Deposit successful');
    } else {
        alert('Invalid amount');
    }
}

// Function to withdraw funds
function withdraw() {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const account = findAccount(accountNumber);

    if (!account) {
        alert('Account not found');
        return;
    }

    if (account.withdraw(amount)) {
        updateAccountInfo();
        alert('Withdrawal successful');
    } else {
        alert('Invalid amount or insufficient funds');
    }
}

// Function to calculate interest
function calculateInterest() {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const rate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('years').value);
    const account = findAccount(accountNumber);

    if (!account || isNaN(rate) || isNaN(years)) {
        alert('Please fill in all fields correctly');
        return;
    }

    const interest = account.calculateInterest(rate, years);
    alert(`Interest earned after ${years} years: $${interest.toFixed(2)}`);
}

// Helper functions for the banking system
function findAccount(accountNumber) {
    return accounts.find(acc => acc.accountNumber === accountNumber);
}

function updateAccountInfo() {
    const accountInfo = document.getElementById('accountInfo');
    accountInfo.innerHTML = '<h3>Accounts:</h3>' + 
        accounts.map(acc => 
            `<div>Account #${acc.accountNumber} - Owner: ${acc.owner}, Balance: $${acc.balance.toFixed(2)}</div>`
        ).join('');
}

// Add some sample data
window.onload = function() {
    // Sample books
    library.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180));
    library.push(new Book("To Kill a Mockingbird", "Harper Lee", 281));
    library.push(new Book("1984", "George Orwell", 328));
    updateBookList();

    // Sample account
    const sampleAccount = new Account("John Doe", 1000);
    accounts.push(sampleAccount);
    updateAccountInfo();
    console.log("Sample account created with number:", sampleAccount.accountNumber);
};
