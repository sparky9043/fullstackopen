const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
