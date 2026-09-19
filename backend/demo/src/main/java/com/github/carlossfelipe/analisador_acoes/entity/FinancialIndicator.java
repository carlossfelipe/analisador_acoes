package com.github.carlossfelipe.analisador_acoes.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "financial_indicator")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FinancialIndicator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(name = "reference_date", nullable = false)
    private LocalDate referenceDate;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal revenue;

    @Column(name = "net_income", nullable = false, precision = 19, scale = 2)
    private BigDecimal netIncome;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal equity;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal ebitda;

    @Column(name = "net_debt", nullable = false, precision = 19, scale = 2)
    private BigDecimal netDebt;

    @Column(name = "earnings_per_share", nullable = false, precision = 19, scale = 2)
    private BigDecimal earningsPerShare;

    
}
