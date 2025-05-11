import { type ElementRef, type HTMLAttributes, type JSX, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { cn } from "../lib/utils";

import { AlbumIcon, HomeIcon, MonitorIcon, SettingsIcon, Sparkles } from "lucide-react";

import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import  Settings  from "../pages/Settings";

export function DockMenu() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  
  const items = [
    { icon: <HomeIcon size={24} />, route: "/" },
    { 
      icon: <SettingsIcon size={24} />, 
      onClick: () => setIsSettingsOpen(true),
      route: null 
    },
    { icon: <Sparkles size={24} />, route: "/ai" }
  ];

  return (
    <>
      <Dock items={items} />
      {isSettingsOpen && (
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="">
              <Settings />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

type DockItem = {
  icon: JSX.Element;
  route?: string | null;
  onClick?: () => void;
};

type DockContainerProps = {
  side?: "right" | "bottom";
  items: DockItem[];
} & HTMLAttributes<HTMLDivElement>;

function Dock({
  side = "bottom",
  className,
  items,
  ...props
}: DockContainerProps) {
  const mouseX = useMotionValue(Infinity);
  const containerX = useMotionValue(0);
  const containerRef = useRef<ElementRef<"div">>(null);

  return (
    <div
      {...props}
      className={cn(side === "right" ? "right-4" : "bottom-4", className)}
    >
      <motion.div
        ref={containerRef}
        className="absolute right-4 bottom-4 flex w-fit h-fit items-end gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 dark:border-neutral-800/50 dark:bg-neutral-950/30"
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            mouseX.set(e.clientX - rect.top);
            containerX.set(rect.y);
          }
        }}
      >
        {items.map(({ icon, route, onClick }, idx) => (
          <DockItem 
            key={idx} 
            containerY={containerX} 
            mouseX={mouseX} 
            route={route}
            onClick={onClick}
          >
            {icon}
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

interface DockItemProps extends HTMLAttributes<HTMLElement> {
  mouseX: MotionValue<number>;
  containerY: MotionValue<number>;
  route?: string | null;
  onClick?: () => void;
}

function DockItem({ children, containerY, mouseX, route, onClick }: DockItemProps) {
  const itemRef = useRef<ElementRef<"div">>(null);
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = itemRef.current?.getBoundingClientRect() ?? {
      x: 0,
      height: 0,
      left: 0,
    };

    const XDiffToContainerX = bounds?.x - containerY.get();

    return val - bounds?.height / 2 - XDiffToContainerX;
  });

  const widthSync = useTransform(distance, [-75, 25, 75], [33, 44, 33]);
  const width = useSpring(widthSync);

  const handleClick = () => {
    if (isNavigating) return;
    
    if (onClick) {
      onClick();
      return;
    }

    if (route) {
      setIsNavigating(true);
      navigate(route);
      setIsNavigating(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <motion.div
      ref={itemRef}
      style={{ width }}
      className="flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </motion.div>
  );
}
