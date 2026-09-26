package com.github.carlossfelipe.analisador_acoes.service;

import org.springframework.stereotype.Service;

import com.github.carlossfelipe.analisador_acoes.dto.EstatisticaDTO;
import com.github.carlossfelipe.analisador_acoes.repository.CompanyRepository;
import com.github.carlossfelipe.analisador_acoes.repository.DividendRepository;
import com.github.carlossfelipe.analisador_acoes.repository.FinancialIndicatorRepository;
import com.github.carlossfelipe.analisador_acoes.repository.StockPriceRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service 
public class StatisticsService {
    private final CompanyRepository companyRepository;
    private final DividendRepository dividendRepository;
    private final FinancialIndicatorRepository financialIndicatorRepository;
    private final StockPriceRepository stockPriceRepository;

    public EstatisticaDTO getEstatistica(){

        return new EstatisticaDTO(
            companyRepository.count(),
            financialIndicatorRepository.count(),
            stockPriceRepository.count(),
            dividendRepository.count()
        );
    }
}
