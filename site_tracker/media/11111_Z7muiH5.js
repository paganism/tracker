class HospitalEmployee {
  constructor(name) {
    this._name = name;
    this._remainingVacationDays = 20;
  }
  
  get name() {
    return this._name;
  }
  
  get remainingVacationDays() {
    return this._remainingVacationDays;
  }
  
  takeVacationDays(daysOff) {
    this._remainingVacationDays -= daysOff;
  }
}

// class Doctor extends HospitalEmployee {
//   constructor(name, insurance) {
//     super(name);
//     super(remainingVacationDays);
//     this._insurance = insurance;
//   }
// }


class Nurse extends HospitalEmployee {
  constructor(name, remainingVacationDays, certifications) {
    super(name, remainingVacationDays);
    this._certifications = certifications;
  }

  // addCertification() {

  // }
}

const nurseOlynyk = new Nurse('Olynyk', ['Trauma', 'Pediatrics']);
console.log(nurseOlynyk.remainingVacationDays);
console.log(nurseOlynyk.takeVacationDays(5));
console.log(nurseOlynyk.remainingVacationDays);


//import { aircrafts, flightReqs, meetsStaffReqs, meetsSpeedRangeReqs} from './airplane';
//export { availableAirplanes as aircrafts, flightRequirements as flightReqs, meetsStaffRequirements as meetsStaffReqs, meetsSpeedRangeRequirements as meetsSpeedRangeReqs};
