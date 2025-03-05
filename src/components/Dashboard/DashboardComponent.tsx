import { Dispatch, FC, SetStateAction } from "react";
import { Book } from "../../models/BookModel.ts";
import { Link } from "react-router-dom";
import moment from "moment";
import "./DashboardComponent.css";

interface BookTableProps {
    books: Book[];
    filteredBooks: Book[];
    handleReactivate: (bookId: number | undefined, currentStatus: boolean | undefined) => void;
    handleDelete: (bookId: number | undefined) => void;
    setFilter: Dispatch<SetStateAction<"all" | "active" | "inactive">>;
}

const formatDate = (dateString?: string | null) => {
    if (!dateString || !moment(dateString).isValid()) return "--";
    return moment(dateString).format("D MMMM YYYY, HH:mm");
};

const DashboardComponent: FC<BookTableProps> = ({ books, filteredBooks, handleReactivate, handleDelete, setFilter }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <select onChange={e => setFilter(e.target.value as "all" | "active" | "inactive")}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <p>Showing {filteredBooks.length} of {books.length} records</p>
            <Link to="/add">Add a Book</Link>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                        <td>{book.isbn}</td>
                        <td>{formatDate(book.createdAt)}</td>
                        <td>{formatDate(book.updatedAt)}</td>
                        <td>
                            <Link to={`/edit/${book.id}`}>Edit</Link>
                            <button onClick={() => handleReactivate(book.id, book.isActive)}>
                                {book.isActive ? 'Deactivate' : 'Reactivate'}
                            </button>
                            {!book.isActive &&
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardComponent;
