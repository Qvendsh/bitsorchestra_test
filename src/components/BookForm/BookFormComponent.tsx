import {Dispatch, FC, FormEvent, SetStateAction} from 'react';
import "./BookFormComponent.css";

interface BookFormComponentProps {
    book: {
        title: string;
        author: string;
        category: string;
        isbn: number;
    };
    setBook: Dispatch<SetStateAction<{
        title: string;
        author: string;
        category: string;
        isbn: number;
    }>>;
    handleSubmit: (e: FormEvent) => void;
    isEdit?: boolean;
}

const BookFormComponent: FC<BookFormComponentProps> = ({ book, setBook, handleSubmit, isEdit }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Book Title:
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={(e) => setBook((prev) => ({ ...prev, title: e.target.value }))}
                        required
                    />
                </label>
                <label>
                    Author Name:
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={(e) => setBook((prev) => ({ ...prev, author: e.target.value }))}
                        required
                    />
                </label>
                <label>
                    Category:
                    <select
                        name="category"
                        value={book.category}
                        onChange={(e) => setBook((prev) => ({ ...prev, category: e.target.value }))}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                    </select>
                </label>
                <label>
                    ISBN:
                    <input
                        type="number"
                        name="isbn"
                        value={book.isbn}
                        onChange={(e) => setBook((prev) => ({ ...prev, isbn: Number(e.target.value) }))}
                        required
                    />
                </label>
                <button type="submit">{isEdit ? "Edit Book" : "Add Book"}</button>
            </form>
        </>
    );
};

export default BookFormComponent;
