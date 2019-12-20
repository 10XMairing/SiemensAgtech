import { EventSubscriber, On } from "event-dispatch";
import EmailService from "../services/EmailService";
import NotificationService from "../services/AndroidNotificationService";
import { Container, Inject } from "typedi";

let EmailServiceInstance = Container.get(EmailService);
const NotifIns = Container.get(NotificationService);
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
  async appointmentRequest(data: {
    to: string;
    token?: string;
    topic?: string;
  }) {
    try {
      const { to, token, topic } = data;

      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "You have a new appointment",
        html: `<p>Hello you have a new appointment request at Agtech : ${to}`
      });

      const body = {
        title: "New Appointment",
        message: "You have a new appointment request!"
      };

      await sendAndroidNotification(body, token, topic);
    } catch (err) {
      console.log(err);
    }
  }

  @On("appointment-confirm")
  async appConfirm(data: { to: string; token?: string; topic?: string }) {
    try {
      const { to, token, topic } = data;
      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "Your recent appointment has been confirmed",
        html: `<p>Hello sir, An expert just confirmed your recent appointment request </p>`
      });

      const body = {
        title: "Appointment Confirmation",
        message: "Your recent appointment has been confirmed"
      };

      await sendAndroidNotification(body, token, topic);
    } catch (err) {
      console.log(err);
    }
  }

  @On("dist-confirm")
  async distConfirm(data: { to: string; token?: string; topic?: string }) {
    try {
      const { to, token, topic } = data;
      const res = await EmailServiceInstance.sendMail({
        to,
        subject: "Your recent distribution request has been confirmed",
        html: `<p>Hello sir, Your distribution request has been confirmed </p>`
      });

      const body = {
        title: "Distribution Request Confirmation",
        message: "Hello sir, Your distribution request has been confirmed "
      };

      await sendAndroidNotification(body, token, topic);
    } catch (err) {
      console.log(err);
    }
  }
}

async function sendAndroidNotification(
  body: {
    title: string;
    message: string;
  },
  token,
  topic
) {
  try {
    if (token) {
      await NotifIns.sendToUser(token, body);
    }

    if (topic) {
      await NotifIns.sendToTopic(topic, body);
    }
  } catch (err) {
    console.log(err);
  }
}
