const FIREBASE_DOMAIN = 'https://react-http-c3ec2-default-rtdb.firebaseio.com';

// Mine
export async function addReview(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/${requestData.bookId}.json`, {
    method: 'POST',
    body: JSON.stringify(requestData.reviewData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add review.');
  }

  return { reviewId: data.name };
}

export async function getAllReviews(bookId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/${bookId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get reviews.');
  }

  const transformedReviews = [];

  for (const key in data) {
    const reviewObj = {
      id: key,
      ...data[key],
    };

    transformedReviews.push(reviewObj);
  }

  return transformedReviews;
}

export async function getBookById(bookId) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedBook = {
    id: data.id,
    title: data.volumeInfo.title,
    authors: data.volumeInfo.authors,
    description: data.volumeInfo.description,
    publishedData: data.volumeInfo.publishedData,
    publisher: data.volumeInfo.publisher,
    images: data.volumeInfo.imageLinks,
  };

  return loadedBook;
}

export async function getBooksByQuery(query) {
  const apiKey = "key=AIzaSyB8Cp41AlbMJACrKVlzzvOsyVF6CGU3CuE";
  const maxRes = "maxResults=12";
  const orderBy = "orderBy=relevance";
  const fullQuery = [query, apiKey, maxRes, orderBy].join("&");

  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${fullQuery}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  // debugger

  const loadedBooks = {
    totalItems: data.totalItems,
    items: data.items.map(item => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        publishedData: item.volumeInfo.publishedData,
        publisher: item.volumeInfo.publisher,
        images: item.volumeInfo.imageLinks,
      };
    }),
  };

  return loadedBooks;
}

// Base
export async function getAllQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quotes.');
  }

  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };

    transformedQuotes.push(quoteObj);
  }

  return transformedQuotes;
}

export async function getSingleQuote(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch quote.');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
}

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    body: JSON.stringify(quoteData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not create quote.');
  }

  return null;
}


