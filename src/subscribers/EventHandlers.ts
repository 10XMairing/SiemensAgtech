import { EventSubscriber, On } from "event-dispatch";
import EmailService from "../services/EmailService";
import { Container, Inject } from "typedi";

let EmailServiceInstance = Container.get(EmailService);

@EventSubscriber()
export class UserEventSubscriber {
  @On("signup")
  async onSignup(to: string) {
    try {
      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "Registered at Agtech",
        html: `<p>You just registered at Agtech with email : ${to}`
      });
    } catch (err) {
      console.log(err);
    }
  }

  @On("appointment")
  async appointmentRequest(to: string) {
    try {
      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "You have a new appointment",
        html: `<p>Hello you have a new appointment request at Agtech : ${to}`
      });
    } catch (err) {
      console.log(err);
    }
  }

  @On("appointment-confirm")
  async appConfirm(to: string) {
    try {
      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "Your recent appointment has been confirmed",
        html: `<p>Hello sir, An expert just confirmed your recent appointment request </p>`
      });
    } catch (err) {
      console.log(err);
    }
  }
}
