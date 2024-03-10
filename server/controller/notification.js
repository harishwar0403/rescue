const { FloodWebNotification } = require("../model/notification");

exports.getnotificationByID = async (req, res, next) => {
  const { volunteerID } = req.query;
  try {
    const notification = await FloodWebNotification.find({
      volunteerID,
    });
    if (notification) {
      res.status(200).send({ status: "ok", data: notification });
    } else {
      res.status(200).send({ status: "error", data: [] });
    }
  } catch (error) {
    next(error);
  }
};
exports.addnotification = async (req, res, next) => {
  try {
    const notification = await FloodWebNotification.create(req.body);
    if (notification) {
      res.status(200).send({ status: "ok", data: notification });
    } else {
      res.status(200).send({ status: "error", data: "not added" });
    }
  } catch (error) {
    next(error);
  }
};
exports.deletenotification = async (req, res, next) => {
  try {
    const notification = await FloodWebNotification.findByIdAndDelete(
      req.params.id
    );
    if (notification) {
      res.status(200).send({ status: "ok", data: "Deleted Successfully" });
    } else {
      res.status(200).send({ status: "error", data: "Failed" });
    }
  } catch (error) {
    next(error);
  }
};
exports.updateNotification = async (req, res, next) => {
  try {
    const notification = await FloodWebNotification.findById(req.params.id);
    if (notification) {
      const prev = notification;
      const newNotfication = {
        userID: prev.userID,
        volunteerID: prev.volunteerID,
        userData: prev.userData,
        request: prev.request,
        isAccepted: true,
      };
      const response = await FloodWebNotification.findByIdAndUpdate(
        req.params.id,
        newNotfication,
        {
          new: true,
        }
      );
      res.status(200).send({ status: "ok", data: response });
    } else {
      res.status(200).send({ status: "error", data: "Request Failed" });
    }
  } catch (error) {
    next(error);
  }
};
exports.getUsernotificationByID = async (req, res, next) => {
  const { userID, isAccepted } = req.query;
  try {
    const notification = await FloodWebNotification.find({
      userID,
      isAccepted,
    });
    if (notification) {
      res.status(200).send({ status: "ok", data: notification });
    } else {
      res.status(200).send({ status: "error", data: [] });
    }
  } catch (error) {
    next(error);
  }
};
