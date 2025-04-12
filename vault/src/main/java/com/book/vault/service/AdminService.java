package com.book.vault.service;

import com.book.vault.model.Admin;
import com.book.vault.model.Reader;
import com.book.vault.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin getAdminById(Long id){
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    public List<Admin> AdminList(){
        return adminRepository.findAll();
    }

    public Admin saveAdmin(Admin admin){
        adminRepository.save(admin);
        return admin;
    }

    public void deleteAdminById(Long id){
        adminRepository.deleteById(id);
    }

    public Admin modifyAdminRole(Long id, Admin admin){
        Admin newAdmin = getAdminById(id);
        newAdmin.setRole(admin.getRole());
        adminRepository.save(admin);
        return newAdmin;
    }
}
