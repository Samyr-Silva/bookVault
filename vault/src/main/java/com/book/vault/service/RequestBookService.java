package com.book.vault.service;

import com.book.vault.model.Book;
import com.book.vault.model.Reader;
import com.book.vault.model.RequestBook;
import com.book.vault.repositories.RequestBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestBookService {

    @Autowired
    private RequestBookRepository requestBookRepository;

    @Autowired
    private ReaderService readerService;

    @Autowired
    private BookService bookService;

    // 📌 1️⃣Criar uma nova requisição de livro
    public String requestBook(Long readerId, RequestBook request) {
        Reader reader = readerService.getReaderById(readerId);
        if (reader != null) {
            request.setReader(reader);
            requestBookRepository.save(request);
            return "Request sent successfully";
        }
        return "Reader not found!";
    }

    // 📌 2️⃣ Listar todas as requisições (para o Admin)
    public List<RequestBook> listRequests() {
        return requestBookRepository.findAll();
    }

    // 📌 3️⃣ Aprovar uma requisição e adicionar como livro na livraria
    public String approveRequest(Long requestId) {
        Optional<RequestBook> requestBook = requestBookRepository.findById(requestId);
        if (requestBook.isPresent()) {
            RequestBook req = requestBook.get();

            // Criar um novo livro baseado na requisição
            Book newBook = new Book();
            newBook.setYear(req.getYear());
            newBook.setAuthor(req.getAuthor());
            newBook.setCategory(req.getCategory());
            newBook.setTitle(req.getTitle());
            bookService.saveBook(newBook);

            // Remover a requisição após aprovação
            requestBookRepository.delete(req);

            return "Book approved and added successfully!";
        }
        return "Request not found!";
    }
}

