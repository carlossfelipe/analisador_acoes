package com.github.carlossfelipe.analisador_acoes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.github.carlossfelipe.analisador_acoes.entity.Company;



public interface CompanyRepository extends JpaRepository<Company, Long>{
    Optional<Company> findByTicker(String ticker);
}
