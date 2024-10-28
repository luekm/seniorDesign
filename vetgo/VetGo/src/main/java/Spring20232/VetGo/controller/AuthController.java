package Spring20232.VetGo.controller;

import Spring20232.VetGo.model.AuthMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class AuthController {
    @MessageMapping("/auth")
    @SendTo("/topic/app")
    public AuthMessage sendMessage(@Payload AuthMessage msg){
        msg.setTimestamp(new Date());
        return msg;
    }
}
