const Notification = ({ notification, type }) => {   
  let theClass = type === "error" ? "theErrorClass" : "theSucessClass"
  console.log(`notification rerendered${notification}`)
  return (
    <>
      <p className={`${theClass} baseNotification`}>{notification}</p>
    </>
  )
}
export {Notification}