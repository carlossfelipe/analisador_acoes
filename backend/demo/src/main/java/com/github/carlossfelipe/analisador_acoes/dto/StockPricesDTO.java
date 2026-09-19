package com.github.carlossfelipe.analisador_acoes.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record StockPricesDTO(
        LocalDate date,
        BigDecimal closePrice
) {

}
