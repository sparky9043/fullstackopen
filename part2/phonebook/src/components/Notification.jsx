const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const messageType = message.toLowerCase().includes("success")
    ? "success"
    : "error";

  return (
    <div className={messageType}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
