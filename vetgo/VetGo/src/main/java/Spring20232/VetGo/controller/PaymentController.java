package Spring20232.VetGo.controller;

import Spring20232.VetGo.model.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;


@RestController
@RequestMapping("payment")
public class PaymentController {


    // in application.properties
    @Value("${STRIPE_SECRET_KEY}")
    private String apiKey;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody PaymentRequest request) {
        Stripe.apiKey = apiKey;

        List<Object> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        // might have to add here tomorrow/wednesday
        Map<String, Object> params = new HashMap<>();
        params.put("amount", request.getAmount());
        params.put("currency", "usd");
        params.put("payment_method_types", paymentMethodTypes);

        try {
            PaymentIntent intent = PaymentIntent.create(params);
            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
