import { notifications } from "../constants/notifications";

function Notification() {

  return (
    <section id="Notification" className="bg-[#00000080] h-[600px] w-[65%] relative overflow-y-scroll rounded-lg border border-gray-300 shadow-md">
      <div className="text-center mb-3">
        <h1 className="font-semibold text-4xl">Notifications</h1>
      </div>

      <div className="flex flex-col">
        {notifications.map((notification) => (
          <div className="flex flex-row gap-3" key={notification.id}>
            <img src={notification.profileImg} alt="ProfileImg" className="rounded-full" height={24} width={24} />
            <div className="mr-5 gap-3 w-[80%]">
              <h3 className="text-2xl">{notification.name}</h3>
              <p className="text-base text-gray leading-relaxed mb-3">{notification.message}</p>
            </div>
            <div className="justify-end mt-2 ml-2">
              <p className=" text-gray-300">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
export default Notification;