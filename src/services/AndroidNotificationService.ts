import { Service, Container } from "typedi";
import * as nodemailer from "nodemailer";

import axios from "axios";

import config from "../config";
import { INotificationBody } from "../interface/INotificationBody";

import logger from "../loaders/winston";

const headers = {
  "Content-Type": "application/json",
  Authorization: config.FCM.FCM_AUTH_KEY
};

const sendurl = config.FCM.FCM_URL;

@Service()
export default class FcmService {
  async sendToUser(token: string, body: INotificationBody) {
    try {
      const myJson = {
        to: token,
        data: body
      };

      const response = await axios.post(sendurl, myJson, {
        headers
      });

      logger.info("notification sent to user");
      logger.debug(response);
    } catch (err) {
      // ignore
      logger.error(err);
    }
  }
  async sendToTopic(topic: string, body: INotificationBody) {
    try {
      const myJson = {
        to: `/topics/${topic}`,
        data: body
      };

      const response = await axios.post(sendurl, myJson, {
        headers
      });

      logger.info(`notification sent to topics : ${topic}`);
      logger.debug(response);
    } catch (err) {
      // ignore
      logger.error(err);
    }
  }
}
