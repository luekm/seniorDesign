package Spring20232.VetGo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tid;
    private String name;
    private String cardNumber;
    private String zip;
    private String receipt;
    private BigDecimal amount;
    private Boolean transactionStatus;

    public Transaction() {
    }

    public Transaction(Long tid, String name, String cardNumber, String zip, String receipt, BigDecimal amount, Boolean transactionStatus) {
        this.tid = tid;
        this.name = name;
        this.cardNumber = cardNumber;
        this.zip = zip;
        this.receipt = receipt;
        this.amount = amount;
        this.transactionStatus = transactionStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getReceipt() {
        return receipt;
    }

    public void setReceipt(String receipt) {
        this.receipt = receipt;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Boolean getTransactionStatus() {
        return transactionStatus;
    }

    public void setTransactionStatus(Boolean paymentStatus) {
        this.transactionStatus = paymentStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return tid.equals(that.tid) && Objects.equals(name, that.name) && Objects.equals(cardNumber, that.cardNumber) && Objects.equals(zip, that.zip) && Objects.equals(receipt, that.receipt) && Objects.equals(amount, that.amount) && Objects.equals(transactionStatus, that.transactionStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tid, name, cardNumber, zip, receipt, amount, transactionStatus);
    }
}
