package Spring20232.VetGo.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
public class AdditionalPetInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long additionalInfoId;
    private String heartRate;
    // private String heartItems;
    private String heartNotes;
    private String lungSounds;
    private String lungNotes;
    // private String eyeItems;
    private String tearProduction;
    private String eyePressure;
    private String eyelidExamination;
    private String irisExamination;
    private String lensExamination;
    private String retinaExamination;
    private String opticNerveExamination;
    // private String coatItems;
    private String coatNotes;
    // private String skinItems;
    private String skinNotes;
    // private String earItems;
    private String earNotes;
    // private String mouthAndTeethItems;
    private String mouthNotes;
    private String teethNotes;
    // private String gaitAndPostureItems;
    private String gaitNotes;
    private String postureNotes;
    private String feetNotes;
    // private String noseItems;
    private String noseNotes;
    private int weight;
    private String weightMessurement;
    private String weightAnalysis;
    private String muscleStructureNotes;
    private int temperature;
    private String dietNotes; 
    private String habitNotes; 
    private String behaviorNotes;
    private String shots;
    private String diagnosis;
    private String plan;
    private String medications;

    public AdditionalPetInformation(Long additionalInfoId, String heartRate, String heartItems, String heartNotes, String lungSounds, String lungNotes, String eyeItems, String tearProduction, String eyePressure, String eyelidExamination, String irisExamination, String lensExamination, String retinaExamination, String opticNerveExamination, String coatItems, String coatNotes, String skinItems, String skinNotes, String earItems, String earNotes, String mouthAndTeethItems, String mouthNotes, String teethNotes, String gaitAndPostureItems, String gaitNotes, String postureNotes, String feetNotes, String noseItems, String noseNotes, int weight, String weightMessurement, String weightAnalysis, String muscleStructureNotes, int temperature, String dietNotes, String habitNotes, String behaviorNotes, String shots, String diagnosis, String plan, String medications) {
        this.additionalInfoId = additionalInfoId;
        this.heartRate = heartRate;
        // this.heartItems = heartItems;
        this.heartNotes = heartNotes;
        this.lungSounds = lungSounds;
        this.lungNotes = lungNotes;
        // this.eyeItems = eyeItems;
        this.tearProduction = tearProduction;
        this.eyePressure = eyePressure;
        this.eyelidExamination = eyelidExamination;
        this.irisExamination = irisExamination;
        this.lensExamination = lensExamination;
        this.retinaExamination = retinaExamination;
        this.opticNerveExamination = opticNerveExamination;
        // this.coatItems = coatItems;
        this.coatNotes = coatNotes;
        // this.skinItems = skinItems;
        this.skinNotes = skinNotes;
        // this.earItems = earItems;
        this.earNotes = earNotes;
        // this.mouthAndTeethItems = mouthAndTeethItems;
        this.mouthNotes = mouthNotes;
        this.teethNotes = teethNotes;
        // this.gaitAndPostureItems = gaitAndPostureItems;
        this.gaitNotes = gaitNotes;
        this.postureNotes = postureNotes;
        this.feetNotes = feetNotes;
        // this.noseItems = noseItems;
        this.noseNotes = noseNotes;
        this.weight = weight;
        this.weightMessurement = weightMessurement;
        this.weightAnalysis = weightAnalysis;
        this.muscleStructureNotes = muscleStructureNotes;
        this.temperature = temperature;
        this.dietNotes = dietNotes; 
        this.habitNotes = habitNotes; 
        this.behaviorNotes = behaviorNotes;
        this.shots = shots;
        this.diagnosis = diagnosis;
        this.plan = plan;
        this.medications = medications;
    }

    public AdditionalPetInformation() {

    }

    public String getHeartRate() {
        return this.heartRate;
    }

    public void setHeartRate(String heartRate) {
        this.heartRate = heartRate;
    }

    // public String getHeartItems() {
    // 	return this.heartItems;
    // }
    
    // public void setHeartItems(String heartItems) {
    // 	this.heartItems = heartItems;
    // }

    public String getHeartNotes() {
        return this.heartNotes;
    }

    public void setHeartNotes(String heartNotes) {
        this.heartNotes = heartNotes;
    }

    public String getLungSounds() {
        return this.lungSounds;
    }

    public void setLungSounds(String lungSounds) {
        this.lungSounds = lungSounds;
    }

    public String getLungNotes() {
        return this.lungNotes;
    }

    public void setLungNotes(String lungNotes) {
        this.lungNotes = lungNotes;
    }

//    public String getEyeItems() {
//        return this.eyeItems;
//    }
//
//    public void setEyeItems(String eyeItems) {
//        this.eyeItems = eyeItems;
//    }

   public String getTearProduction() {
       return this.tearProduction;
   }

   public void setTearProduction(String tearProduction) {
       this.tearProduction = tearProduction;
   }

   public String getEyePressure() {
       return this.eyePressure;
   }

   public void setEyePressure(String eyePressure) {
       this.eyePressure = eyePressure;
   }

   public String getEyelidExamination() {
       return this.eyelidExamination;
   }

   public void setEyelidExamination(String eyelidExamination) {
       this.eyelidExamination = eyelidExamination;
   }

    public String getIrisExamination() {
        return this.irisExamination;
    }

    public void setIrisExamination(String irisExamination) {
        this.irisExamination = irisExamination;
    }

    public String getLensExamination() {
        return this.lensExamination;
    }

    public void setLensExamination(String lensExamination) {
        this.lensExamination = lensExamination;
    }

    public String getRetinaExamination() {
        return this.retinaExamination;
    }

    public void setRetinaExamination(String retinaExamination) {
        this.retinaExamination = retinaExamination;
    }

    public String getOpticNerveExamination() {
        return this.opticNerveExamination;
    }

    public void setOpticNerveExamination(String opticNerveExamination) {
        this.opticNerveExamination = opticNerveExamination;
    }

    // public String getCoatItems() {
    //     return this.coatItems;
    // }

    // public void setCoatItems(String coatItems) {
    //     this.coatItems = coatItems;
    // }

    public String getCoatNotes() {
        return this.coatNotes;
    }

    public void setCoatNotes(String coatNotes) {
        this.coatNotes = coatNotes;
    }

    // public String getSkinItems() {
    //     return this.skinItems;
    // }

    // public void setSkinItems(String skinItems) {
    //     this.skinItems = skinItems;
    // }

    public String getSkinNotes() {
        return this.skinNotes;
    }

    public void setSkinNotes(String skinNotes) {
        this.skinNotes = skinNotes;
    }

    // public String getEarItems() {
    //     return this.earItems;
    // }

    // public void setEarItems(String earItems) {
    //     this.earItems = earItems;
    // }

    public String getEarNotes() {
        return this.earNotes;
    }

    public void setEarNotes(String earNotes) {
        this.earNotes = earNotes;
    }

    // public String getMouthAndTeethItems() {
    //     return this.mouthAndTeethItems;
    // }

    // public void setMouthAndTeethItems(String mouthAndTeethItems) {
    //     this.mouthAndTeethItems = mouthAndTeethItems;
    // }

    public String getMouthNotes() {
        return this.mouthNotes;
    }

    public void setMouthNotes(String mouthNotes) {
        this.mouthNotes = mouthNotes;
    }

    public String getTeethNotes() {
        return this.teethNotes;
    }

    public void setTeethNotes(String teethNotes) {
        this.teethNotes = teethNotes;
    }

    // public String getGaitAndPostureItems() {
    //     return this.gaitAndPostureItems;
    // }

    // public void setGaitAndPostureItems(String gaitAndPostureItems) {
    //     this.gaitAndPostureItems = gaitAndPostureItems;
    // }

    public String getGaitNotes() {
        return this.gaitNotes;
    }

    public void setGaitNotes(String gaitNotes) {
        this.gaitNotes = gaitNotes;
    }

    public String getPostureNotes() {
        return this.postureNotes;
    }

    public void setPostureNotes(String postureNotes) {
        this.postureNotes = postureNotes;
    }

    public String getFeetNotes() {
        return this.feetNotes;
    }

    public void setFeetNotes(String feetNotes) {
        this.feetNotes = feetNotes;
    }

    // public String getNoseItems() {
    //     return this.noseItems;
    // }

    // public void setNoseItems(String noseItems) {
    //     this.noseItems = noseItems;
    // }

    public String getNoseNotes() {
        return this.noseNotes;
    }

    public void setNoseNotes(String noseNotes) {
        this.noseNotes = noseNotes;
    }

    public int getWeight() {
        return this.weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getWeightMessurement() {
        return this.weightMessurement;
    }

    public void setWeightMessurement(String weightMessurement) {
        this.weightMessurement = weightMessurement;
    }

    public String getWeightAnalysis() {
        return this.weightAnalysis;
    }

    public void setWeightAnalysis(String weightAnalysis) {
        this.weightAnalysis = weightAnalysis;
    }

    public String getMuscleStructureNotes() {
        return this.muscleStructureNotes;
    }

    public void setMuscleStructureNotes(String muscleStructureNotes) {
        this.muscleStructureNotes = muscleStructureNotes;
    }

    public int getTemperature() {
        return this.temperature;
    }

    public void setTemperature(int temperature) {
        this.temperature = temperature;
    }

    public String getDietNotes() {
        return this.dietNotes;
    }

    public void setDietNotes(String dietNotes) {
        this.dietNotes = dietNotes;
    }

    public String getHabitNotes() {
        return this.habitNotes;
    }

    public void setHabitNotes(String habitNotes) {
        this.habitNotes = habitNotes;
    }

    public String getBehaviorNotes() {
        return this.behaviorNotes;
    }

    public void setBehaviorNotes(String behaviorNotes) {
        this.behaviorNotes = behaviorNotes;
    }

    public String getShots() {
        return this.shots;
    }

    public void setShots(String shots) {
        this.shots = shots;
    }

    public String getDiagnosis() {
        return this.diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getPlan() {
        return this.plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getMedications() {
        return this.medications;
    }

    public void setMedications(String medications) {
        this.medications = medications;
    }

}

