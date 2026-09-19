package com.github.carlossfelipe.analisador_acoes.dto;

import java.math.BigDecimal;

public record CompanyIndicatorsDTO(
        String ticker,
        BigDecimal peRatio,
        BigDecimal roe,
        BigDecimal netMargin,
        BigDecimal netDebtEbitda,
        BigDecimal dividendYield
) {
}
