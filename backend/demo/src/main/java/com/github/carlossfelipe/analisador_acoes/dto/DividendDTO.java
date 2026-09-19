package com.github.carlossfelipe.analisador_acoes.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record DividendDTO(
        LocalDate paymentDate,
        BigDecimal amountPerShare,
        String type
    ) {

}
