package com.github.carlossfelipe.analisador_acoes.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.carlossfelipe.analisador_acoes.dto.CompanyDTO;
import com.github.carlossfelipe.analisador_acoes.dto.CompanyIndicatorsDTO;
import com.github.carlossfelipe.analisador_acoes.dto.DividendDTO;
import com.github.carlossfelipe.analisador_acoes.dto.FinancialIndicatorDTO;
import com.github.carlossfelipe.analisador_acoes.dto.StockPricesDTO;
import com.github.carlossfelipe.analisador_acoes.service.CompanyService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController 
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService service;

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> listarEmpresas() {
        return ResponseEntity.ok(service.listarEmpresas());
    }

    @GetMapping("/{ticker}")
    public ResponseEntity<CompanyDTO> buscarEmpresa(@PathVariable String ticker) {
        return ResponseEntity.ok(service.buscarEmpresa(ticker));
    }

    @GetMapping("/{ticker}/indicators")
    public ResponseEntity<CompanyIndicatorsDTO> buscarIndicadores(@PathVariable String ticker) {
        return ResponseEntity.ok(service.buscarIndicadores(ticker));
    }

    @GetMapping("/{ticker}/financials")
    public ResponseEntity<List<FinancialIndicatorDTO>> historicoFinanceiro(@PathVariable String ticker) {
        return ResponseEntity.ok(service.historicoEmpresa(ticker));
    }

    @GetMapping("/{ticker}/prices")
    public ResponseEntity<List<StockPricesDTO>> precos(@PathVariable String ticker) {
        return ResponseEntity.ok(service.precosEmpresa(ticker));
    }

    @GetMapping("/{ticker}/dividends")
    public ResponseEntity<List<DividendDTO>> buscarDividendos(@PathVariable String ticker) {
        return ResponseEntity.ok(service.buscarDividendos(ticker));
    }

    @GetMapping("/compare")
    public ResponseEntity<List<CompanyIndicatorsDTO>> compararIndicadores(@RequestParam List<String> tickers) {
        return ResponseEntity.ok(service.compararIndicadores(tickers));
    }
    
}