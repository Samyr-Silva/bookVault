package com.book.vault.controller;

import com.book.vault.model.Admin;
import com.book.vault.model.Reader;
import com.book.vault.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public ResponseEntity<List<Admin>> list(){
        return new ResponseEntity<>(adminService.AdminList(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/get/{id}")
    public ResponseEntity<Admin> getById(@PathVariable Long id){
        return new ResponseEntity<>(adminService.getAdminById(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/add")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin){
        return new ResponseEntity<>(adminService.saveAdmin(admin), HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        adminService.deleteAdminById(id);
        return new ResponseEntity<>("Admin deleted successfully", HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/mod/{id}")
    public ResponseEntity<Admin> modifyRole(@PathVariable Long id, @RequestBody Admin admin){
        Admin newAdmin = adminService.modifyAdminRole(id, admin);
        return new ResponseEntity<>(newAdmin, HttpStatus.ACCEPTED);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/login")
    public ResponseEntity<Admin> login(@RequestBody Admin loginInfo) {
        Admin admin = adminService.findAdminByNameAndEmail(loginInfo.getName(), loginInfo.getEmail());
        if (admin != null && "admin".equalsIgnoreCase(admin.getRole())) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
