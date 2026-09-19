package com.github.carlossfelipe.analisador_acoes.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record FinancialIndicatorDTO(
    LocalDate referenceDate,
    BigDecimal revenue,
    BigDecimal netIncome,
    BigDecimal equity,
    BigDecimal ebitda,
    BigDecimal netDebt,
    BigDecimal earningsPerShare
)  {
    
}
