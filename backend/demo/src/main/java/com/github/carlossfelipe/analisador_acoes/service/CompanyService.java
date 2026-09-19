package com.github.carlossfelipe.analisador_acoes.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.github.carlossfelipe.analisador_acoes.dto.CompanyDTO;
import com.github.carlossfelipe.analisador_acoes.dto.CompanyIndicatorsDTO;
import com.github.carlossfelipe.analisador_acoes.dto.DividendDTO;
import com.github.carlossfelipe.analisador_acoes.dto.FinancialIndicatorDTO;
import com.github.carlossfelipe.analisador_acoes.dto.StockPricesDTO;
import com.github.carlossfelipe.analisador_acoes.entity.Company;
import com.github.carlossfelipe.analisador_acoes.entity.Dividend;
import com.github.carlossfelipe.analisador_acoes.entity.FinancialIndicator;
import com.github.carlossfelipe.analisador_acoes.entity.StockPrice;
import com.github.carlossfelipe.analisador_acoes.exception.CompanyNotFoundException;
import com.github.carlossfelipe.analisador_acoes.repository.CompanyRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CompanyService {
    private final CompanyRepository repository;

    public List<CompanyDTO> listarEmpresas() {
        List<Company> companies = repository.findAll();

        if (companies.isEmpty()) {
            return List.of();
        }

        return companies.stream()
                .map(company -> new CompanyDTO(
                        company.getTicker(),
                        company.getLegalName(),
                        company.getCnpj(),
                        company.getSector(),
                        company.getSegment(),
                        company.getStatus()))
                .toList();
    }

    public CompanyDTO buscarEmpresa(String ticker) {
        Company company = repository.findByTicker(ticker)
                .orElseThrow(() -> new CompanyNotFoundException(ticker));

        return new CompanyDTO(
                company.getTicker(),
                company.getLegalName(),
                company.getCnpj(),
                company.getSector(),
                company.getSegment(),
                company.getStatus());
    }

    public CompanyIndicatorsDTO buscarIndicadores(String ticker) {
        Company company = repository.findByTicker(ticker)
                .orElseThrow(() -> new CompanyNotFoundException(ticker));

        if (company.getFinancialIndicators() == null || company.getFinancialIndicators().isEmpty()) {
            throw new IllegalStateException("Empresa sem indicadores financeiros cadastrados: " + ticker);
        }

        FinancialIndicator indicator = company.getFinancialIndicators().stream()
                .max(Comparator.comparing(FinancialIndicator::getReferenceDate))
                .orElseThrow();

        BigDecimal peRatio = calcularPeRatio(indicator);
        BigDecimal roe = calcularRoe(indicator);
        BigDecimal netMargin = calcularNetMargin(indicator);
        BigDecimal netDebtEbitda = calcularNetDebtEbitda(indicator);
        BigDecimal dividendYield = calcularDividendYield(company);

        return new CompanyIndicatorsDTO(
                company.getTicker(),
                peRatio,
                roe,
                netMargin,
                netDebtEbitda,
                dividendYield);
    }

    public List<FinancialIndicatorDTO> historicoEmpresa(String ticker) {
        Company company = repository.findByTicker(ticker)
                .orElseThrow(() -> new CompanyNotFoundException(ticker));

        return company.getFinancialIndicators().stream()
                .sorted(Comparator.comparing(
                        FinancialIndicator::getReferenceDate)
                        .reversed())
                .map(historico -> new FinancialIndicatorDTO(
                        historico.getReferenceDate(),
                        historico.getRevenue(),
                        historico.getNetIncome(),
                        historico.getEquity(),
                        historico.getEbitda(),
                        historico.getNetDebt(),
                        historico.getEarningsPerShare()))
                .toList();

    }

    public List<StockPricesDTO> precosEmpresa(String ticker) {
        Company company = repository.findByTicker(ticker)
                .orElseThrow(() -> new CompanyNotFoundException(ticker));

        return company.getStockPrices().stream()
                .sorted(Comparator.comparing(StockPrice::getDate)
                        .reversed())
                .map(price -> new StockPricesDTO(
                        price.getDate(),
                        price.getClosePrice()))
                .toList();

    }

    public List<DividendDTO> buscarDividendos(String ticker) {
        Company company = repository.findByTicker(ticker)
                .orElseThrow(() -> new CompanyNotFoundException(ticker));

        return company.getDividends()
                .stream()
                .sorted(Comparator.comparing(Dividend::getPaymentDate))
                .map(dividend -> new DividendDTO(
                        dividend.getPaymentDate(),
                        dividend.getAmountPerShare(),
                        dividend.getType()
                ))
                .toList();
    }

    public List<CompanyIndicatorsDTO> compararIndicadores(List<String> tickers){

        if (tickers.isEmpty()) {
            throw new RuntimeException("Sem Tickers pra analizar");
        }

        List<CompanyIndicatorsDTO> indicadores = new ArrayList<>();

        for(String indicatos : tickers){
            indicadores.add(buscarIndicadores(indicatos));
        }

        return indicadores;
    }



    private BigDecimal calcularPeRatio(FinancialIndicator indicator) {
        BigDecimal price = indicadorPrecoEmpresa(indicator);
        BigDecimal earningsPerShare = indicator.getEarningsPerShare();

        if (earningsPerShare == null || BigDecimal.ZERO.compareTo(earningsPerShare) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return price.divide(earningsPerShare, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calcularRoe(FinancialIndicator indicator) {
        BigDecimal netIncome = indicator.getNetIncome();
        BigDecimal equity = indicator.getEquity();

        if (equity == null || BigDecimal.ZERO.compareTo(equity) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return netIncome.multiply(BigDecimal.valueOf(100))
                .divide(equity, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calcularNetMargin(FinancialIndicator indicator) {
        BigDecimal netIncome = indicator.getNetIncome();
        BigDecimal revenue = indicator.getRevenue();

        if (revenue == null || BigDecimal.ZERO.compareTo(revenue) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return netIncome.multiply(BigDecimal.valueOf(100))
                .divide(revenue, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calcularNetDebtEbitda(FinancialIndicator indicator) {
        BigDecimal ebitda = indicator.getEbitda();
        BigDecimal netDebt = indicator.getNetDebt();

        if (ebitda == null || BigDecimal.ZERO.compareTo(ebitda) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return netDebt.divide(ebitda, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calcularDividendYield(Company company) {
        if (company.getDividends() == null || company.getDividends().isEmpty()) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        BigDecimal latestDividend = company.getDividends().getLast().getAmountPerShare();
        BigDecimal price = company.getStockPrices() == null || company.getStockPrices().isEmpty()
                ? BigDecimal.ZERO
                : company.getStockPrices().getLast().getClosePrice();

        if (price == null || BigDecimal.ZERO.compareTo(price) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }

        return latestDividend.multiply(BigDecimal.valueOf(100))
                .divide(price, 2, RoundingMode.HALF_UP);
    }

    private BigDecimal indicadorPrecoEmpresa(FinancialIndicator indicator) {
        if (indicator.getCompany() == null || indicator.getCompany().getStockPrices() == null
                || indicator.getCompany().getStockPrices().isEmpty()) {
            return BigDecimal.ZERO;
        }

        return indicator.getCompany().getStockPrices().getLast().getClosePrice();
    }
}
