package Spring20232.VetGo.controller;

import Spring20232.VetGo.model.Appointment;
import Spring20232.VetGo.model.PaymentRequest;
import Spring20232.VetGo.model.Transaction;
import Spring20232.VetGo.repository.AppointmentRepository;
import Spring20232.VetGo.repository.TransactionRepository;
import Spring20232.VetGo.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("transaction")
public class TransactionController {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    PaymentService paymentService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Transaction>> getAllTransaction() {
        List<Transaction> transactionList = new ArrayList<>();
        transactionRepository.findAll().forEach(transactionList::add);
        return ResponseEntity.status(HttpStatus.OK).body(transactionList);
    }

    @GetMapping(value = "/get/{tid}")
    public ResponseEntity<Transaction> getTransaction(@PathVariable Long tid) {
        return ResponseEntity.status(HttpStatus.OK).body(transactionRepository.findById(tid).orElse(null));
    }

    @PostMapping(value = "/stripe/{aid}")
    public ResponseEntity<String> completePaymentStripe(@RequestBody PaymentRequest request, @PathVariable Long aid) throws StripeException {
        String chargeId= paymentService.charge(request);
        Appointment appointment = appointmentRepository.findById(aid).orElse(null);

        if (appointment == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find appointment in database");

        if (chargeId != null) {
            appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
            return ResponseEntity.status(HttpStatus.OK).body(chargeId);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please check the credit card details entered");
    }

    // For in built transaction setting if not using stripe
    @PostMapping(value = "/set/{aid}")
    public ResponseEntity<?> setPayment(@RequestBody Transaction transaction, @PathVariable Long aid) {
        Appointment appointment = appointmentRepository.findById(aid).orElse(null);

        if (appointment == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find appointment in database");

        Transaction transaction1 = new Transaction();
        transaction1.setTransactionStatus(false);
        transaction1.setAmount(transaction.getAmount());
        transaction1.setName(transaction.getName());
        transaction1.setZip(transaction.getZip());
        transaction1.setCardNumber(transaction.getCardNumber());
        transaction1.setReceipt(transaction.getReceipt());
        transactionRepository.save(transaction1);
        appointment.setTransaction(transaction1);
        appointmentRepository.save(appointment);

        return ResponseEntity.status(HttpStatus.OK).body(appointment);
    }


    // For in built completing of transaction if not using stripe
    @PostMapping(value = "/complete/{aid}")
    public ResponseEntity<?> completePayment(@PathVariable long aid) {
        Appointment appointment = appointmentRepository.findById(aid).orElse(null);

        if (appointment == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find appointment in database");

        appointment.getTransaction().setTransactionStatus(true);
        appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);

        return ResponseEntity.status(HttpStatus.OK).body(appointment);
    }

    @ExceptionHandler
    public String handleError(StripeException ex) {
        return ex.getMessage();
    }


}
