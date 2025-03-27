package com.book.vault.service;

import com.book.vault.model.Reader;
import com.book.vault.repositories.ReaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReaderService {

    @Autowired
    private ReaderRepository readerRepository;

    public Reader getReaderById(Long id){
        return readerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reader not found"));
    }

    public List<Reader> readerList(){
        return readerRepository.findAll();
    }

    public Reader addReader(Reader reader){
        readerRepository.save(reader);
        return reader;
    }

    public void deleteReaderById(Long id){
        readerRepository.deleteById(id);
    }
}
