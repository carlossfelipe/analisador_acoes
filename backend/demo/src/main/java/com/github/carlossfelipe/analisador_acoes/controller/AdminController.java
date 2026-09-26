package com.github.carlossfelipe.analisador_acoes.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.carlossfelipe.analisador_acoes.dto.CompanyDTO;
import com.github.carlossfelipe.analisador_acoes.dto.EstatisticaDTO;
import com.github.carlossfelipe.analisador_acoes.service.CompanyService;
import com.github.carlossfelipe.analisador_acoes.service.StatisticsService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;


@RequiredArgsConstructor
@RestController 
@RequestMapping("/api/admin")
public class AdminController {
    
    private final StatisticsService statisticsService;
    private final CompanyService companyService;

    @GetMapping("/statistics")
    public ResponseEntity<EstatisticaDTO> estatistica() {
        return ResponseEntity.ok(statisticsService.getEstatistica());
    }

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyDTO>> companies() {
        return ResponseEntity.ok(companyService.listarEmpresasOrdenado());
    }

  

    @DeleteMapping("/companies/{ticker}") 
    public ResponseEntity<Void> deletarEmpresa(@PathVariable String ticker) {
        companyService.deletarEmpresa(ticker);
        return ResponseEntity.noContent().build();
    }




}
