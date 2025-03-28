package com.book.vault.controller;

import com.book.vault.model.RequestBook;
import com.book.vault.service.RequestBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/request")
public class RequestBookController {

    @Autowired
    private RequestBookService requestBookService;

    @RequestMapping(method = RequestMethod.POST, path = "/{readerId}/request")
    public ResponseEntity<String> requestBook(@PathVariable Long readerId, @RequestBody RequestBook request) {
        String msg = requestBookService.requestBook(readerId, request);
        if (msg.equals("Request sent successfully")) {
            return new ResponseEntity<>("Request sent successfully!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Reader not found!", HttpStatus.NOT_FOUND);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public ResponseEntity<List<RequestBook>> listRequests() {
        return new ResponseEntity<>(requestBookService.listRequests(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/{requestId}/approve")
    public ResponseEntity<String> approveRequest(@PathVariable Long requestId) {
        String msg = requestBookService.approveRequest(requestId);
        if (msg.equals("Book approved and added successfully!")) {
            return new ResponseEntity<>("Book approved and added successfully!", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Request not found", HttpStatus.NOT_FOUND);
    }
}
