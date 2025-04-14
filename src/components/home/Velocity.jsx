import { VelocityScroll } from "../ui/VelocityScroll";

export function ScrollBasedVelocityDemo() {
  return (
    <div className="relative bg-black flex w-full flex-col items-center justify-center overflow-hidden">
      <VelocityScroll className="text-[1.5rem] sm:text-2xl md:text-4xl text-white whitespace-nowrap">
        therigthchoice
      </VelocityScroll>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/80 to-transparent"></div>
    </div>
  );
}
