package com.github.carlossfelipe.analisador_acoes.exception;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException(String ticker) {
        super("Empresa não encontrada: " + ticker);
    }
}
