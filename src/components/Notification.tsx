import type { NotiType } from "../types";

interface NotificationProps {
  noti: NotiType
}

const Notification = ({ noti }: NotificationProps) => {
  const { nType, msg } = noti;

  const style = {
    width: "fit-content",
    marginBottom: 16,
    padding: "5px 10px",
    whiteSpace: "pre-wrap",
    color: nType === 0 ? "red" : "green",
    backgroundColor: nType === 0 ? "rgba(255, 99, 71, 0.2)"
      : "rgba(123, 255, 71, 0.2)",
    border: "1px solid",
    borderColor: nType === 0 ? "red" : "green",
    borderRadius: 5,
    display: !msg ? "none" : "block"
  };

  return (
    <div style={style}>
      {msg}
    </div>
  );
};

export default Notification;