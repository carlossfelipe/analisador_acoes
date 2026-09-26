package com.github.carlossfelipe.analisador_acoes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.carlossfelipe.analisador_acoes.entity.StockPrice;

public interface StockPriceRepository extends JpaRepository<StockPrice, Long> {
    
}
