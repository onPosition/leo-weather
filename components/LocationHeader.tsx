import { useUI } from "@/app/storage/UIContext";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function LocationHeader(currentLocation: {
  currentLocation: { city: string } | { city: "foo" };
}) {
  function locationMenuHandler(): void {
    navigator.vibrate(50);
    redirect("/city");
  }
  return (
    <>
      <div className="flex items-center justify-center p-4">
        <h2 onClick={locationMenuHandler}>
          {currentLocation.currentLocation && (
            <div className="flex items-center gap-2">
              <Image
                src="/location.svg"
                alt="Location"
                width={16}
                height={16}
              />
              {currentLocation.currentLocation.city}
            </div>
          )}
        </h2>
      </div>
    </>
  );
}
