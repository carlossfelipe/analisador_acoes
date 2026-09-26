package com.github.carlossfelipe.analisador_acoes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.carlossfelipe.analisador_acoes.dto.EstatisticaDTO;
import com.github.carlossfelipe.analisador_acoes.service.AdminService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController 
@RequestMapping("/api/admin")
public class AdminController {
    
    private final AdminService service;

    @GetMapping("/statistics")
    public ResponseEntity<EstatisticaDTO> estatistica() {
        return ResponseEntity.ok(service.getEstatistica());
    }




}
