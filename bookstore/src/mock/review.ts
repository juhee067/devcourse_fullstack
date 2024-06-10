import { BookReviewItem } from '../models/book.model';
import { http, HttpResponse } from 'msw';
export const reviewsById = http.get('"https://localhost:3000/reviews:bookId', () => {
  const data: BookReviewItem[] = [];
  return HttpResponse.json(data, {
    status: 200,
    statusText: 'ok',
  });
});
