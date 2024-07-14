import fetch from "node-fetch";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=isbn:";
const LOCAL_API = "http://localhost:5000/api/book/add-new-book";

// Function to fetch data from Google Books API
async function fetchBooks(isbnList) {
  const books = [];
  for (const isbn of isbnList) {
    try {
      const response = await fetch(`${GOOGLE_BOOKS_API}${isbn}`);
      const data = await response.json();
      if (data.totalItems > 0) {
        books.push(data.items[0]);
      }
    } catch (error) {
      console.error(`Error fetching book with ISBN ${isbn}:`, error);
    }
  }
  return books;
}

// Function to parse and extract relevant book data
function parseBookData(book) {
  const volumeInfo = book.volumeInfo;
  const industryIdentifiers = volumeInfo.industryIdentifiers;
  const ISBN_10 =
    industryIdentifiers.find((id) => id.type === "ISBN_10")?.identifier || "";
  const ISBN_13 =
    industryIdentifiers.find((id) => id.type === "ISBN_13")?.identifier || "";

  return {
    title: volumeInfo.title || "",
    authors: volumeInfo.authors || [],
    ISBN: ISBN_13 || ISBN_10 || "",
    publisher: volumeInfo.publisher || "",
    genre: volumeInfo.categories ? volumeInfo.categories[0] : "",
    description: volumeInfo.description || "",
    year: volumeInfo.publishedDate
      ? new Date(volumeInfo.publishedDate).getFullYear()
      : "",
    small_icon: volumeInfo.imageLinks?.smallThumbnail || "",
    large_icon: volumeInfo.imageLinks?.thumbnail || "",
    quantity: 0, // Default value as per the model
  };
}

// Function to add each book to the local API
async function addBookToLocalAPI(book) {
  try {
    const response = await fetch(LOCAL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTM1ODY2NzRmZjVlMzg0NDk2ZTM5MCIsImlhdCI6MTcyMDk0MTc2OSwiZXhwIjoxNzIxMzczNzY5fQ.VXgVWYqort4QD3w_q6OdH02F9u-4KEmREZWUsI_TRlU",
      },
      body: JSON.stringify(book),
    });

    const result = await response.json();
    if (result.success) {
      console.log(`Book titled "${book.title}" added successfully.`);
    } else {
      console.error(
        `Failed to add book titled "${book.title}":`,
        result.message
      );
    }
  } catch (error) {
    console.error(`Error adding book titled "${book.title}":`, error);
  }
}

// Main function to execute the script
(async function main() {
  const isbnList = [
    "9781737557012",
    "9781604561142",
    "9788194928614",
    "9781621062158",
    "9789387769182",
    "9781952517051",
    "9780785399407",
    "9780994096920",
  ];

  const books = await fetchBooks(isbnList);
  for (const book of books) {
    const bookData = parseBookData(book);
    // Assuming req.user.library_id is available in your context
    const userLibraryId = "6693586674ff5e384496e38e"; // Replace with actual library_id from req.user
    bookData.library_id = userLibraryId;
    await addBookToLocalAPI(bookData);
  }
})();
