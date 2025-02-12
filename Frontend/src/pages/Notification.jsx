import { notifications } from "../constants/notifications";

function Notification() {

  return (
    <section id="Notification" className="bg-black bg-opacity-50 h-[600px] w-[50%] p-4 relative overflow-y-scroll rounded-lg border border-gray-300 shadow-md">
      <div className="text-center mb-3">
        <h1 className="text-primary font-semibold text-3xl">Notifications</h1>
      </div>

      <div className="flex flex-col">
        {notifications.map((notification) => (
          <div className="flex flex-row gap-3" key={notification.id}>
            {/* <img src={notification.profileImg} alt="ProfileImg" className="rounded-full" height={24} width={24} /> */}
            <div className="mr-5 gap-3 w-[80%]">
              <h3 className="text-2xl text-white">{notification.name}</h3>
              <p className="text-base text-[#b1b1b1] leading-relaxed mb-3">{notification.message}</p>
            </div>
            <div className="justify-end mt-2 ml-2">
              <p className=" text-gray-300 text-sm">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
export default Notification;