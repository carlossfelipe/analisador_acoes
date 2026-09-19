package com.github.carlossfelipe.analisador_acoes.dto;

public record CompanyDTO(
        String ticker,
        String legalName,
        String cnpj,
        String sector,
        String segment,
        String status
) {
}
