package Spring20232.VetGo.model;

import jakarta.persistence.Entity;

import java.util.Objects;

@Entity
public class Tag extends BaseEntity {
    private int excellentService;
    private int greatConversation;
    private int attentive;
    private int punctual;
    private int knowledgeable;
    private int cleanTidy;

    public Tag() {
    }

    public Tag(int excellentService, int greatConversation, int attentive, int punctual, int knowledgeable, int cleanTidy) {
        this.excellentService = excellentService;
        this.greatConversation = greatConversation;
        this.attentive = attentive;
        this.punctual = punctual;
        this.knowledgeable = knowledgeable;
        this.cleanTidy = cleanTidy;
    }

    public int getExcellentService() {
        return excellentService;
    }

    public void setExcellentService(int excellentService) {
        this.excellentService = excellentService;
    }

    public int getGreatConversation() {
        return greatConversation;
    }

    public void setGreatConversation(int greatConversation) {
        this.greatConversation = greatConversation;
    }

    public int getAttentive() {
        return attentive;
    }

    public void setAttentive(int attentive) {
        this.attentive = attentive;
    }

    public int getPunctual() {
        return punctual;
    }

    public void setPunctual(int punctual) {
        this.punctual = punctual;
    }

    public int getKnowledgeable() {
        return knowledgeable;
    }

    public void setKnowledgeable(int knowledgeable) {
        this.knowledgeable = knowledgeable;
    }

    public int getCleanTidy() {
        return cleanTidy;
    }

    public void setCleanTidy(int cleanTidy) {
        this.cleanTidy = cleanTidy;
    }

    public void addAttentive(int attentive) {
        this.attentive += attentive;
    }

    public void addCleanTidy(int cleanTidy) {
        this.cleanTidy += cleanTidy;
    }

    public void addPunctual(int punctual) {
        this.punctual += punctual;
    }

    public void addKnowledgeable(int knowledgeable) {
        this.knowledgeable += knowledgeable;
    }

    public void addExcellentService(int excellentService) {
        this.excellentService += excellentService;
    }

    public void addGreatConversation(int greatConversation) {
        this.greatConversation += greatConversation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tag tag = (Tag) o;
        return excellentService == tag.excellentService && greatConversation == tag.greatConversation && attentive == tag.attentive && punctual == tag.punctual && knowledgeable == tag.knowledgeable && cleanTidy == tag.cleanTidy;
    }

    @Override
    public int hashCode() {
        return Objects.hash(excellentService, greatConversation, attentive, punctual, knowledgeable, cleanTidy);
    }

}
