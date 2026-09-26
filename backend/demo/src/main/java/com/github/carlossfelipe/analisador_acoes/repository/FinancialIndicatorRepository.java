package com.github.carlossfelipe.analisador_acoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.carlossfelipe.analisador_acoes.entity.FinancialIndicator;

public interface FinancialIndicatorRepository extends JpaRepository<FinancialIndicator, Long> {
    
}
